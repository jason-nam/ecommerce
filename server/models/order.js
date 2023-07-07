const db = require("../db");
const OrderItem = require("./orderItem");

module.exports = class OrderModel {

    constructor(data = {}) {
        this.items = data.items || [];
        //TODO
    }

    addItems(items) {
        this.items = items.map(item => new OrderItem(item));
    }

    /**
     * Create new order for user
     * @return {Object|null} created order record
     */
    async createOrder() {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Update order for  user
     * @param {Object} id order id
     * @param {Object} data order data to update
     * @return {Object|null} updated order record
     */
    async updateOrder(id, data) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Load order for a user
     * @param {number} userid user id
     * @return {Array} order records
     */
    static async getOrderByUser(userid) {
        try {

            // TODO
            return [];

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Retrieve order by id
     * @param {number} id order id
     * @return {Object|null} order record
     */
    static async getOrderById(id) {
        try {

            // TODO
            return null;
                
        } catch(err) {
            throw new Error(err);
        }
    }

}