const db = require("../db");

module.exports = class ShippingModel {

    constructor(data = {}) {

    }

    static async getShippingByUserid(userid) {
        try {

            const statement = `SELECT *
                               FROM shipping
                               WHERE userid = $1`;
            const values = [userid];

            const result = await db.query(statement, values);

            if (result.rows) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async getShippingById(shippingid) {
        try {

            const statement = `SELECT *
                               FROM shipping
                               WHERE id = $1
                               LIMIT 1`;
            const values = [shippingid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    async createShipping(
        userid, 
        first_name, 
        last_name, 
        addr_line_1, 
        addr_line_2, 
        addr_city, 
        addr_province, 
        addr_country, 
        addr_postal, 
        phone_number
    ) {
        try {

            const statement = `INSERT INTO shipping (
                                   userid, 
                                   first_name, 
                                   last_name, 
                                   addr_line_1,
                                   addr_line_2, 
                                   addr_city, 
                                   addr_province, 
                                   addr_country, 
                                   addr_postal,
                                   phone_number)
                               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                               RETURNING *`;
            const values = [
                userid, 
                first_name, 
                last_name, 
                addr_line_1, 
                addr_line_2, 
                addr_city, 
                addr_province, 
                addr_country, 
                addr_postal, 
                phone_number
            ];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async updateShipping(
        shippingid, 
        first_name, 
        last_name, 
        addr_line_1, 
        addr_line_2, 
        addr_city, 
        addr_province, 
        addr_country, 
        addr_postal, 
        phone_number
    ) {
        try {

            const statement = `UPDATE shipping
                               SET 
                                   first_name = $2, 
                                   last_name = $3, 
                                   addr_line_1 = $4, 
                                   addr_line_2 = $5, 
                                   addr_city = $6, 
                                   addr_province = $7, 
                                   addr_country = $8, 
                                   addr_postal = $9, 
                                   phone_number = $10
                               WHERE id = $1
                               RETURNING *`;
            const values = [
                shippingid, 
                first_name, 
                last_name, 
                addr_line_1, 
                addr_line_2, 
                addr_city, 
                addr_province, 
                addr_country, 
                addr_postal, 
                phone_number
            ];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async deleteShipping(shippingid) {
        try {

            const statement = `DELETE
                               FROM shipping
                               WHERE id = $1
                               RETURNING *`;
            const values = [shippingid];

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