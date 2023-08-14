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

}