const db = require("../db");

module.exports = class PaymentModel {

    constructor(data = {}) {

    }

    static async getPaymentsByUserid(userid) {
        try {

            const statement = `SELECT *
                               FROM payments
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

    static async getPaymentById(paymentid) {
        try {

            const statement = `SELECT *
                               FROM payments
                               WHERE id = $1
                               LIMIT 1`;
            const values = [paymentid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    async createPayment(
        userid, name_on_card, addr_line_1, addr_line_2, 
        addr_city, addr_province, addr_postal, 
        phone_number, encrypted_card, encrypted_exp
    ) {
        try {

            const statement = `INSERT INTO payments (
                                   userid, name_on_card, addr_line_1, addr_line_2, 
                                   addr_city, addr_province, addr_postal, 
                                   phone_number, encrypted_card, encrypted_exp)
                               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                               RETURNING *`;
            const values = [
                userid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async updatePayment(
        paymentid, name_on_card, addr_line_1, addr_line_2, 
        addr_city, addr_province, addr_postal, 
        phone_number, encrypted_card, encrypted_exp
    ) {
        try {

            const statement = `UPDATE payments
                               SET 
                                   name_on_card = $2, 
                                   addr_line_1 = $3, 
                                   addr_line_2 = $4, 
                                   addr_city = $5, 
                                   addr_province = $6, 
                                   addr_postal = $7, 
                                   phone_number = $8, 
                                   encrypted_card = $9, 
                                   encrypted_exp = $10
                               WHERE id = $1
                               RETURNING *`;
            const values = [
                paymentid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async deletePayment(paymentid) {
        try {

            const statement = `DELETE
                               FROM payments
                               WHERE id = $1
                               RETURNING *`;
            const values = [paymentid];

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