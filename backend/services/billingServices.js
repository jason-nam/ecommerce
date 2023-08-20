const BillingModel = require("../models/billing");
const BillingModelInstance = new BillingModel();
const PaymentModel = require("../models/payment");

module.exports = class BillingService {

    // payment model

    async getBillingsByUserid(userid) {
        try {

            const billings = await BillingModel.getBillingsByUserid(userid);
            return billings;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getBillingById(billingid) {
        try {

            const billing = await BillingModel.getBillingById(billingid);
            return billing;

        } catch(err) {
            throw new Error(err);
        }
    }

    async createBilling(data) {
        try {

            const { userid, paymentid, amount, payment_date, payment_status } = data;

            const payments = await PaymentModel.getPaymentsByUserid(userid);
            const isPaymentidMatch = payments.some(payment => payment.id === paymentid);

            if (!isPaymentidMatch) {
                console.log("payment information does not exist for user");
                throw err;
            }

            const billing = await BillingModelInstance.createBilling(
                userid, paymentid, amount, payment_date, payment_status);

            return billing;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateBilling(data) {
        try {

            const { billingid, amount, payment_date, payment_status } = data;
            const billing = await BillingModel.updateBilling(billingid, amount, payment_date, payment_status);
            return billing;

        } catch(err) {
            throw new Error(err);
        }
    }

    async deleteBilling(billingid) {
        try {

            const billing = await BillingModel.deleteBilling(billingid);
            return billing;

        } catch(err) {
            throw new Error(err);
        }
    }
}