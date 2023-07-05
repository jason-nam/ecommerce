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
     * @param {Object} userId user id
     * @return {Object|null} created cart record
     */
    async createCart(userId) {
        try {

            const data = { userId, ...this };

            // const statement = `INSERT INTO carts (created, modified, userid)
            //                    VALUES ($1, $2, $3, $4)
            //                    RETURNING *`;

            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';

            const result = await db.query(statement);

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
     * @param {number} userId user id
     * @return {Object|null} cart record
     */
    static async getByUser(userId) {
        try {

            const statement = `SELECT *
                               FROM carts
                               WHERE "userId" = $1
                               LIMIT 1`;
            const values = [userId];

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
     * Load a cart by id
     * @param {number} id cart id
     * @return {Object|null} cart record
     */
    static async getById(id) {
        try {

            const statement = `SELECT *
                               FROM carts
                               WHERE "id" = $1
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
}