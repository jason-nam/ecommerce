const db = require("../db");

module.exports = class CartItemModel {

    constructor(data = {}) {
        // TODO
    }

    /**
     * Create a new cart item
     * @param {Object} data cart item data
     * @return {Object|null} created cart item
     */
    static async createCartItem(data) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Update existing cart item
     * @param {Object} data updated cart item data
     * @param {Object} id cart item id
     * @return {Object|null} updated cart item
     */
    static async updateCartItem(id, data) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
    
    /**
     * Retrieve cart item for a cart
     * @param {Object} cartId cart id
     * @return {Array} created cart item
     */
    static async getCartItems(cartId) {
        try {

            // TODO
            return [];

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Delete a cart item
     * @param {Object} id cart item id
     * @return {Object|null} deleted cart item
     */
    static async deleteCartItem(id) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
}