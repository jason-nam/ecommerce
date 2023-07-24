const db = require("../db");

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
            const { email, password, firstname, lastname, isactive } = data;
            const statement = `INSERT INTO users (email, password, firstname, lastname, isactive)
                               VALUES ($1, $2, $3, $4, $5)
                               RETURNING *`;
            const values = [email, password, firstname, lastname, isactive];

            const result = await db.query(statement, values);

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
    async updateUser(userid, data) {
        try {

            const { email, password, firstname, lastname } = data;
            const statement = `UPDATE users 
                               SET email = $1, password = $2, firstname = $3, lastname = $4 
                               WHERE id = $5
                               RETURNING *`;
            const values = [email, password, firstname, lastname, userid];

            const result = await db.query(statement, values);

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
            
            const statement = `SELECT * 
                               FROM users 
                               WHERE email = $1 
                               LIMIT 1`;
            const values = [email];

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

    /**
     * 
     * @param {String} userid 
     * @returns {Object|null}
     */
    static async deleteUser(userid) {
        try {

            const statement = `DELETE
                               FROM users
                               WHERE id = $1
                               RETURNING *`;
            const values = [userid];
        
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

    /**
     * 
     * @param {String} userid 
     * @returns {Object|null}
     */
    async updateUserActiveStatus(userid, isactive) {
        try {

            const statement = `UPDATE users 
                               SET isactive = $1
                               WHERE id = $2
                               RETURNING *`;
            const values = [isactive, userid];

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