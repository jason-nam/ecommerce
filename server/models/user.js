const db = require("../db");
const pgp = require("pg-promise");

module.exports = class UserModel {

    constructor(data = {}) {
        // TODO
    }

    /**
     * Create new user record
     * @param {Object} data user data
     * @return {Object|null} created user record  
     */
    async createUser(data) {
        try {

            const { email, password, firstname, lastname } = data;
            const statement = `INSERT INTO users (email, password, firstname, lastname)
                               VALUES ($1, $2, $3, $4)
                               RETURNING *`;

            const result = await db.query(statement, [email, password, firstname, lastname]);
            
            // const statement = pgp.helpers.insert(data, null, 'users') + `RETURNING *`;
            // const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Update user record
     * @param {Object} data updated user data
     * @return {Object|null} update user record
     */
    async updateUser(data) {
        try {

            const { userId, email, password, firstname, lastname } = data;
            const statement = `UPDATE users 
                               SET email = $1, password = $2, firstname = $3, lastname = $4 
                               WHERE id = $5
                               RETURNING *`;

            const result = await db.query(statement, [email, password, firstname, lastname, userId]);

            // const { userId, ...params} = data
            // const statement = pgp.helpers.update(params, null, "users") 
            //                 + `WHERE id = ${ userId } RETURNING *`;
            // const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Find user record by email
     * @param {String} email email address
     * @return {Object|null} user record
     */
    async getUserByEmail(email) {
        try {
            
            // const results = await db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
            // return results.rows;

            const statement = `SELECT * 
                               FROM users 
                               WHERE email = $1 
                               LIMIT 1`;
            const values =  [email];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Find user record by ID
     * @param {String} id user id
     * @return {Object|null} user record
     */
    async getUserById(id) {
        try {

            // const results = await db.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
            // return results.rows;
            
            const statement = `SELECT * 
                               FROM users 
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