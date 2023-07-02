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

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
}