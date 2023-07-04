const CartModel = require("../models/cart");
const CartModelInstance = new CartModel();
const CartItemModel = require("../models/cartItem");
const CartItemModelInstance = new CartItemModel();

module.exports = class CartService {

    async create(userId) {

        try {

            const cart = CartModelInstance.createCart(userId);

            return cart;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getCart(userId) {

        try {

            const cart = await CartModelInstance.getByUser(userId);
            const items = await CartItemModelInstance.getByUser()

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