const db = require("../db");

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
     * @param {Object} data order item data
     * @return {Object|null} created order item
     */
    static async createOrderItem(data) {
        try {

            // TODO
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
    static async getOrderItem(orderid) {
        try {

            // TODO
            return [];

        } catch(err) {
            throw new Error(err);
        }
    }
}