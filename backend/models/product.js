const db = require("../db");


module.exports = class ProductModel {

    constructor(data = {}) {
        // TODO
    }

    /**
     * Get list of products
     * @return {Array} array of products
     */
    async getProducts(page, limit, search) {

        try {
            
            // select list of all products in ascending id order
            var statement = `SELECT *
                            FROM products
                            WHERE name LIKE $1
                            ORDER BY id ASC
                            LIMIT $2
                            OFFSET $3
                            `;

            var values = [limit, (page - 1) * limit];
            if (search != null) {
                values.unshift(`%${search}%`)
            } else 
                values.unshift(`%%`)


            const result = await db.query(statement, values);


            // return result array if result.rows not null and has length property
            if (result.rows?.length) {
                return result.rows;
            }

            return [];

        } catch(err) {
            throw new Error(err);
        }
    }

    async getProductsCount (search) {
        try {
            const statement = `SELECT COUNT(*) 
                                FROM products  
                                WHERE
                                NAME LIKE $1`;

            const values = [];
            if (search != null) {
                values.unshift(`%${search}%`)
            } else 
                values.unshift(`%%`)


            const result = await db.query(statement, values);

            // return result array if result.rows not null and has length property
            if (result.rows?.length) {
                return result.rows;
            }

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
                throw new Error(err);
            }
    }
}