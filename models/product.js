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
        // await db.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        try {
            const results = await db.query('SELECT * FROM products ORDER BY id ASC');
            return results.rows;
            // return [];
        } catch(err) {
            throw new Error(error);
        }
    }

    /**
     * Find product by ID
     * @param {Object} id product id
     * @return {Object|null} product record
     */
    async getProductById(id) {
        // db.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
            try {
                const results = await db.query('SELECT * FROM products WHERE id = $1 LIMIT 1', [id]);
                return results.rows;
            } catch(err) {
                throw new Error(error);
            }
    }
}