const db = require("../db");
const moment = require("moment");
const OrderItemModel = require("./orderItem");

module.exports = class OrderModel {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.items = data.items || [];
        this.modified = moment.utc().toISOString();
        this.status = data.status || 'PENDING';
        this.total = data.total || 0;
        this.userid = data.userid || null;
    }

    addItems(items) {
        this.items = items.map(item => new OrderItemModel(item));
    }

    /**
     * Create new order for user
     * @return {Object|null} created order record
     */
    async createOrder() {
        try {

            const { items, ...order } = this; 
            const statement = `INSERT INTO orders (total, status, created, modified, userid)
                               VALUES ($1, $2, $3, $4, $5)
                               RETURNING *`;
            const values = [order.total, order.status, order.created, order.modified, order.userid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                Object.assign(this, result.rows[0]);
                this.items.map((item) => item.createOrderItem(result.rows[0].id));
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Update order for  user
     * @param {Object} data order data to update
     * @return {Object|null} updated order record
     */
    async updateOrder(data) {
        try {

            const { status } = data;
            this.status = status;

            const statement = `UPDATE orders 
                               SET status = $1
                               WHERE id = $2
                               RETURNING *`;
            const values = [this.status, this.id];
            
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
     * Load order for a user
     * @param {number} userid user id
     * @return {Object|null} order records
     */
    static async getOrderByUser(userid) {
        try {

            const statement = `SELECT *
                               FROM orders
                               WHERE userid = $1`;
            const values = [userid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Retrieve order by id
     * @param {number} orderid order id
     * @return {Object|null} order record
     */
    static async getOrderById(orderid) {
        try {

            const statement = `SELECT oi.*, p.name, p.price, im.image
                                FROM orders o
                                INNER JOIN orderitems oi ON oi.orderid = o.id
                                INNER JOIN products p ON oi.productid = p.id
                                LEFT JOIN (
                                    SELECT productid, STRING_AGG(image, ', ' ORDER BY id) AS image
                                    FROM images
                                    GROUP BY 1) 
                                im ON p.id = im.productid
                                WHERE o.id = $1`;
            const values = [orderid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return null;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Delete a order
     * @param {Object} id order id
     * @return {Object|null} deleted order
     */
    static async deleteOrder(id) {
        try {

            const statement = `DELETE
                               FROM orders
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