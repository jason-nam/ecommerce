const db = require("../db");
const moment = require("moment");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartModel {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.modified = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
    }

    /**
     * Create a cart for user
     * @param {Object} userid user id
     * @return {Object|null} created cart record
     */
    async createCart(userid) {
        try {
            const statement = `INSERT INTO carts (created, modified, userid)
                               VALUES ($1, $2, $3)
                               RETURNING *`;
            const values = [this.created, this.modified, userid];

            // const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';

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
     * Load a cart by user id
     * @param {number} userid user id
     * @return {Object|null} cart record
     */
    static async getByUser(userid) {
        try {

            const statement = `SELECT *
                               FROM carts
                               WHERE userid = $1`;
            const values = [userid];

            const result = await db.query(statement, values);

            // if (result.rows?.length) {
            if (result.rows) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    /**
     * Load a cart by id
     * @param {number} id cart id
     * @return {Object|null} cart record
     */
    static async getById(id) {
        try {

            const statement = `SELECT *
                               FROM carts
                               WHERE id = $1
                               LIMIT 1`;
            const values = [id];

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
     * Delete a cart
     * @param {Object} id cart id
     * @return {Object|null} deleted cart
     */
    static async deleteCart(id) {
        try {

            const statement = `DELETE
                               FROM carts
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