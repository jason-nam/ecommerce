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

            // TODO
            await db.query(
                'INSERT INTO users (email, passwordhash, firstname, lastname) VALUES ($1, $2, $3, $4)', 
                [email, password, firstname, lastname]);
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

            // TODO
            await db.query(
                'UPDATE users SET email = $1, firstname = $2, lastname = $3 WHERE id = $4', 
                [email, firstname, lastname, id]);
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
            // TODO
            const results = await db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
            return results.rows;

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

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
}