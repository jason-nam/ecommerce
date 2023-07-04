const CartModel = require("../models/cart");
const CartModelInstance = new CartModel();

module.exports = class CartService {

    async create(data) {

        try {

            // TODO

        } catch(err) {
            throw new Error(err);
        }
    }

    async loadCart(userId, item) {

        try {

            // TODO

        } catch(err) {
            throw new Error(err);
        }
    }

    async addItem(userId, item) {

        try {

            // TODO

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateItem(cartItemId, data) {

        try {

            // TODO

        } catch(err) {
            throw new Error(err);
        }
    }

    async removeItem(cartItemId) {

        try {

            // TODO

        } catch(err) {
            throw new Error(err);
        }
    }

    async checkout(cartId, userId, paymentInfo) {
        
        try {

            // TODO

        } catch(err) {
            throw new Error(err);
        }
    }
}