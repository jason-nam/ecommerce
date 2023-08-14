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

}