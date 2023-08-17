const db = require("../db");
const moment = require("moment");

module.exports = class OrderItemModel {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.description = data.description;
        this.modified = moment.utc().toISOString();
        this.name = data.name;
        this.price = data.price || 0;
        this.productid = data.id;
        this.qty = data.qty || 1;
        this.orderid = data.orderid || null;
    }

    /**
     * Create new order item
     * @return {Object|null} created order item
     */
    async createOrderItem(orderid) {
        try {

            this.orderid = orderid;

            const statement = `INSERT INTO orderitems (qty, created, orderid, productid)
                               VALUES ($1, $2, $3, $4)
                               RETURNING *`;
            const values = [this.qty, this.created, this.orderid, this.productid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Retrieve order items for an order
     * @param {Object} orderid order id
     * @return {Array} created cart item
     */
    static async getOrderItems(orderid) {
        try {

            const statement = `SELECT oi.qty, oi.id AS cartitemid, p.*
                               FROM orderitems oi
                               INNER JOIN products p ON p.id = oi.productid
                               WHERE orderid = $1`
            const values = [orderid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return [];

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Delete a order item
     * @param {Object} id order item id
     * @return {Object|null} deleted order item
     */
    static async deleteOrderItem(id) {
        try {

            const statement = `DELETE
                               FROM orderitems
                               WHERE id = $1
                               RETURNING *`;
            const values = [id];
        
            // Execute SQL statment
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
}