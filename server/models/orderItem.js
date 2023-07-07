const db = require("../db");

module.exports = class OrderItemModel {

    constructor(data = {}) {
        // TODO
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