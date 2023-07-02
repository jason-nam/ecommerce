const db = require("../db");

module.exports = class ProductModel {

    constructor(data = {}) {
        // TODO
    }

    /**
     * Get list of products
     * @return {Array} array of products
     */
    async getProducts() {
        try {

            // TODO
            return [];

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Find product by ID
     * @param {Object} id product id
     * @return {Object|null} product record
     */
    async getProductById(id) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
}