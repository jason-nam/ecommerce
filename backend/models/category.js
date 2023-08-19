const db = require("../db");

module.exports = class CategoryModel {

    constructor(data = {}) {

    }

    static async getAllCategories() {
        try {

            const statement = `SELECT *
                               FROM categories`;
            const values = [];

            const result = await db.query(statement, values);

            if (result.rows) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async getCategoryById(categoryid) {
        try {

            const statement = `SELECT *
                               FROM categories
                               WHERE id = $1
                               LIMIT 1`;
            const values = [categoryid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    async createCategory(name) {
        try {

            const statement = `INSERT INTO categories (name)
                               VALUES ($1)
                               RETURNING *`;
            const values = [name];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async updateCategory(categoryid, name) {
        try {

            const statement = `UPDATE categories
                               SET name = $2
                               WHERE id = $1
                               RETURNING *`;
            const values = [categoryid, name];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async deleteCategory(categoryid) {
        try {

            const statement = `DELETE
                               FROM categories
                               WHERE id = $1
                               RETURNING *`;
            const values = [categoryid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }
}