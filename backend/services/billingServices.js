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

            const { 
                userid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp 
            } = data;

            const payment = await PaymentModel.getPaymentsByUserid(userid);
            const paymentid = payment.id;

            const billing = await BillingModelInstance.createBilling(
                userid, paymentid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp
            );
            return billing;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateBilling(data) {
        try {

            const { billingid, ...updated_data } = data;
            const billing = await BillingModel.updateBilling(billingid, updated_data);
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