const db = require("../db");

module.exports = class SubcategoryModel {

    constructor(data = {}) {

    }

    static async getAllSubcategories() {
        try {

            const statement = `SELECT *
                               FROM subcategories`;
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

    static async getSubcategoriesByCategoryId(categoryid) {
        try {

            const statement = `SELECT *
                               FROM subcategories
                               WHERE categoryid = $1`;
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

    static async getSubcategoryById(subcategoryid) {
        try {

            const statement = `SELECT *
                               FROM subcategories
                               WHERE id = $1
                               LIMIT 1`;
            const values = [subcategoryid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

        } catch(err) {
            throw new Error(500, err);
        }
    }

    async createSubcategory(categoryid, name) {
        try {

            const statement = `INSERT INTO subcategories (name, categoryid)
                               VALUES ($1, $2)
                               RETURNING *`;
            const values = [name, categoryid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async updateSubcategory(subcategoryid, name) {
        try {

            const statement = `UPDATE subcategories
                               SET name = $2
                               WHERE id = $1
                               RETURNING *`;
            const values = [subcategoryid, name];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async deleteSubcategory(subcategoryid) {
        try {

            const statement = `DELETE
                               FROM subcategories
                               WHERE id = $1
                               RETURNING *`;
            const values = [subcategoryid];

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