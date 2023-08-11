const db = require("../db");


module.exports = class ProductModel {

    constructor(data = {}) {
        // TODO
    }
    
    /**
     * Get list of products
     * @return {Array} array of products
     */
    async getProducts(page, limit, search, category) {

        try {
            // select list of all products in ascending id order
            const statement = `SELECT p.*, c.name AS category, sc.name AS subcategory
                               FROM products p 
                                   INNER JOIN subcategories sc ON sc.id = p.subcategoryid 
                                   INNER JOIN categories c ON c.id = sc.categoryid
                               WHERE (LOWER(p.name) LIKE LOWER($1) OR LOWER(sc.name) LIKE LOWER($1) OR LOWER(c.name) LIKE LOWER($1))
                                   AND (LOWER(c.name) LIKE LOWER($2) OR LOWER(sc.name) LIKE LOWER($2))
                               ORDER BY p.id ASC
                               LIMIT $3
                               OFFSET $4
                               `;

            if (search == null) {
                search = "";
            } 

            if (category == null) {
                category = "";
            }


            const values = [`%${search}%`, `%${category}%`, limit, (page - 1) * limit];            

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

    async getProductsCount (search, category) {
        try {
            const statement = `SELECT COUNT(*)
                               FROM products p 
                                   INNER JOIN subcategories sc ON sc.id = p.subcategoryid 
                                   INNER JOIN categories c ON c.id = sc.categoryid
                               WHERE (LOWER(p.name) LIKE LOWER($1) OR LOWER(sc.name) LIKE LOWER($1) OR LOWER(c.name) LIKE LOWER($1))
                                   AND (LOWER(c.name) LIKE LOWER($2) OR LOWER(sc.name) LIKE LOWER($2))
                               `;

            if (search == null) {
                search = "";
            } 

            if (category == null) {
                category = "";
            }

            const values = [`%${search}%`, `%${category}%`]

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
                const statement = `SELECT p.*, , c.name AS category, sc.name AS subcategory
                                   FROM products p
                                       INNER JOIN subcategories sc ON sc.id = p.subcategoryid 
                                       INNER JOIN categories c ON c.id = sc.categoryid
                                   WHERE p.id = $1
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