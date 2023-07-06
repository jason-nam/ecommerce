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
            
            // select list of all products in ascending id order
            const statement = `SELECT *
                               FROM products
                               ORDER BY id ASC`;

            const values = [];

            const result = await db.query(statement, values);

            // return result array if result.rows not null and has length property
            if (result.rows?.length) {
                return result.rows;
            }

            return [];

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
            try {

                // select products with id 1 of limit 1
                const statement = `SELECT *
                                   FROM products
                                   WHERE id = $1
                                   LIMIT 1`;

                const values = [id];

                const result = await db.query(statement, values);

                if (result.rows?.length) {
                    return result.rows;
                }

                return null;

            } catch(err) {
                throw new Error(error);
            }
    }
}