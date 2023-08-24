const ShippingModel = require("../models/shipping");
const ShippingModelInstance = new ShippingModel();

module.exports = class ShippingService {

    async getShippingByUserid(userid) {
        try {

            const shipping = await ShippingModel.getShippingByUserid(userid);
            return shipping;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getShippingById(shippingid) {
        try {

            const shipping = await ShippingModel.getShippingById(shippingid);
            return shipping;

        } catch(err) {
            throw new Error(err);
        }
    }

    async createShipping(data) {
        try {

            const {
                userid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp 
            } = data;

            const payment = await ShippingModelInstance.createShipping(
                userid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp
            );
            return payment;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateShipping(data) {
        try {

            const { paymentid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp } = data;

            const payment = await ShippingModel.updateShipping(
                paymentid, name_on_card, addr_line_1, addr_line_2, 
                addr_city, addr_province, addr_postal, 
                phone_number, encrypted_card, encrypted_exp);
                
            return payment;

        } catch(err) {
            throw new Error(err);
        }
    }

    async deleteShipping(shippingid) {
        try {

            const shipping = await ShippingModel.deleteShipping(shippingid);
            return shipping;

        } catch(err) {
            throw new Error(err);
        }
    }
}