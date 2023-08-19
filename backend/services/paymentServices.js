const PaymentModel = require("../models/payment");
const PaymentModelInstance = new PaymentModel();

module.exports = class PaymentService {

    // payment model

    async getPaymentsByUserid(userid) {
        try {

            const payments = await PaymentModel.getPaymentsByUserid(userid);
            return payments;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getPaymentById(paymentid) {
        try {

            const payment = await PaymentModel.getPaymentById(paymentid);
            return payment;

        } catch(err) {
            throw new Error(err);
        }
    }

    async createPayment(data) {
        try {

            const { 
                userid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp 
            } = data;

            const payment = await PaymentModelInstance.createPayment(
                userid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp
            );
            return payment;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updatePayment(data) {
        try {

            const { paymentid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp } = data;

            const payment = await PaymentModel.updatePayment(
                paymentid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp);
                
            return payment;

        } catch(err) {
            throw new Error(err);
        }
    }

    async deletePayment(paymentid) {
        try {

            const payment = await PaymentModel.deletePayment(paymentid);
            return payment;

        } catch(err) {
            throw new Error(err);
        }
    }
}