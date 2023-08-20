const db = require("../db");

module.exports = class BillingModel {

    constructor(data = {}) {

    }

    static async getBillingsByUserid(userid) {
        try {

            const statement = `SELECT *
                               FROM billings
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

    static async getBillingById(paymentid) {
        try {

            const statement = `SELECT *
                               FROM billings
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

    async createBilling(userid, paymentid, amount, payment_date, payment_status) {
        try {

            const statement = `INSERT INTO billings (
                                   userid, paymentid, amount, payment_date, payment_status)
                               VALUES ($1, $2, $3, $4, $5)
                               RETURNING *`;
            const values = [userid, paymentid, amount, payment_date, payment_status];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async updateBilling(billingid, amount, payment_date, payment_status) {
        try {

            const statement = `UPDATE billings
                               SET 
                                   amount = $2, 
                                   payment_date = $3, 
                                   payment_status = $4
                               WHERE id = $1
                               RETURNING *`;
            const values = [billingid, amount, payment_date, payment_status];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async deleteBilling(billingid) {
        try {

            const statement = `DELETE
                               FROM billings
                               WHERE id = $1
                               RETURNING *`;
            const values = [billingid];

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