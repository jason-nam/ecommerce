const CartModel = require("../models/cart");
const CartItemModel = require("../models/cartItem");
const OrderModel = require("../models/order");

module.exports = class CartService {

    async create(userId) {

        try {

            const CartModelInstance = new CartModel();
            const cart = await CartModelInstance.createCart(userId);

            return cart;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getCart(userId) {

        try {

            const cart = await CartModel.getByUser(userId);
            const items = await CartItemModel.getCartItems(cart.id);

            cart.items = items;

            return cart;

        } catch(err) {
            throw new Error(err);
        }
    }

    async addItem(userId, item) {

        try {

            const cart = await CartModel.getByUser(userId);

            const data = { cartId: cart.id, ...item };
            const cartItem = await CartItemModel.createCartItem(data);

            return cartItem;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateItem(cartItemId, data) {

        try {

            const cartItem = await CartItemModel.updateCartItem(cartItemId, data);

            return cartItem;

        } catch(err) {
            throw new Error(err);
        }
    }

    async removeItem(cartItemId) {

        try {

            const cartItem = await CartItemModel.deleteCartItem(cartItemId);

            return cartItem;

        } catch(err) {
            throw new Error(err);
        }
    }

    async checkout(cartId, userId, paymentInfo) {
        
        try {

            // list of cart items
            const cartItems = await CartItemModel.getCartItems(cartId);

            // generate total price from cart items
            const totalPrice = cartItems.reduce((totalPrice, item) => {
                return totalPrice += Number(item.price);
            }, 0);

            const Order = new OrderModel({ totalPrice, userId });
            Order.addItems(cartItems);
            await Order.createOrder();

            // payment method
            // TODO

            // order COMPLETE after successful payment process
            const order = Order.updateOrder({ status: "COMPLETE" });

            return order;

        } catch(err) {
            throw new Error(err);
        }
    }
}