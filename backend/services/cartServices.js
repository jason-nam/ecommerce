const CartModel = require("../models/cart");
const CartModelInstance = new CartModel();
const CartItemModel = require("../models/cartItem");
const OrderModel = require("../models/order");

module.exports = class CartService {

    async create(userid) {

        try {
            // check if cart exists for user
            const existingCart = await CartModel.getByUser(userid);
            if (existingCart.rows[0]) {
                console.log("User's Cart Exists");
                return existingCart;
            } else {
                const cart = await CartModelInstance.createCart(userid);
                return cart;
            }

        } catch(err) {
            throw new Error(err);
        }
    }

    async getCart(userid) {

        try {
            const cart = await CartModel.getByUser(userid);
            const items = await CartItemModel.getCartItems(cart.rows[0].id);

            cart.items = items;
            return cart;

        } catch(err) {
            throw new Error(err);
        }
    }

    async addItem(userid, item) {

        try {
            const cart = await CartModel.getByUser(userid);
            const data = { cartid: cart.rows[0].id, ...item };

            const cartItem = await CartItemModel.createCartItem(data);

            return cartItem;

        } catch(err) {
            throw new Error(err);
        }
    }

    async addMultiItems(userid, items) {

        try {
            const cart = await CartModel.getByUser(userid);
            const cartid = cart.rows[0].id;

            const promises = items.map(async x => {
                let item = { productid: x.id , ...x }
                let data = await CartItemModel.createCartItem({ cartid, ...item });
                return data.rows[0]
            })

            const settled = await Promise.allSettled(promises);

            let updatedCart = await CartModel.getByUser(userid);
            const updatedItems = await CartItemModel.getCartItems(updatedCart.rows[0].id);

            updatedCart.items = updatedItems;
            return {settled, updatedCart};

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateItem(cartitemid, data) {

        try {
            const cartItem = await CartItemModel.updateCartItem(cartitemid, data);
            return cartItem;

        } catch(err) {
            throw new Error(err);
        }
    }

    async removeItem(cartitemid) {

        try {
            const cartItem = await CartItemModel.deleteCartItem(cartitemid);

            return cartItem;

        } catch(err) {
            throw new Error(err);
        }
    }

    async checkout(cartid, userid, paymentinfo) {
        
        try {
            // list of cart items
            const cartItems = await CartItemModel.getCartItems(cartid);

            // generate total price from cart items
            const total = cartItems.reduce((total, item) => {
                return total += Number(item.price * item.qty);
            }, 0);

            // create new order
            const Order = new OrderModel({ total, userid });
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