const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

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

            // const statement = pgp.helpers.insert(data, null, "cartItems") + `RETURNING *`;

            const { qty, productid, cartid } = data;

            const statement = `INSERT INTO cartitems (qty, productid, cartid)
                               VALUES ($1, $2, $3)
                               RETURNING *`;
            const values = [qty, productid, cartid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

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

            const { qty, productid, cartid } = data;

            const statement = `UPDATE cartitems 
                               SET qty = $1, productid = $2, cartid = $3
                               WHERE id = $4
                               RETURNING *`;
            const values = [qty, productid, cartid, id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
    
    /**
     * Retrieve cart item for a cart
     * @param {Object} cartid cart id
     * @return {Array} created cart item
     */
    static async getCartItems(cartid) {
        try {

            const statement = `SELECT ci.qty, ci.id AS cartitemid, p.*
                               FROM cartitems ci INNER JOIN products p ON p.id = ci.productid
                               WHERE cartid = $1`;
            const values = [cartid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

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

            const statement = `DELETE
                               FROM cartitems
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