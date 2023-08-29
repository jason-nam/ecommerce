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
                userid, 
                first_name = null, 
                last_name = null, 
                addr_line_1 = null, 
                addr_line_2 = null, 
                addr_city = null, 
                addr_province = null, 
                addr_country = null, 
                addr_postal = null, 
                phone_number = null 
            } = data;

            const shipping = await ShippingModelInstance.createShipping(
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
            );

            return shipping;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateShipping(data) {
        try {

            const { 
                shippingid, 
                first_name = null, 
                last_name = null, 
                addr_line_1 = null, 
                addr_line_2 = null, 
                addr_city = null, 
                addr_province = null, 
                addr_country = null, 
                addr_postal = null, 
                phone_number = null 
            } = data;

            const shipping = await ShippingModel.updateShipping(
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
            );
                
            return shipping;

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