const OrderModel = require("../models/order");
const OrderItemModel = require("../models/orderItem");

module.exports = class OrderService {

    // async create(userid) {

    //     try {

    //         const CartModelInstance = new CartModel();
    //         const cart = await CartModelInstance.createCart(userid);

    //         return cart;

    //     } catch(err) {
    //         throw new Error(err);
    //     }
    // }

    // async getCart(userid) {

    //     try {

    //         const cart = await CartModel.getByUser(userid);
    //         const items = await CartItemModel.getCartItems(cart.rows[0].id);

    //         cart.items = items;

    //         return cart;

    //     } catch(err) {
    //         throw new Error(err);
    //     }
    // }

    // async addItem(userid, item) {

    //     try {

    //         const cart = await CartModel.getByUser(userid);
    //         const data = { cartid: cart.rows[0].id, ...item };

    //         const cartItem = await CartItemModel.createCartItem(data);

    //         return cartItem;

    //     } catch(err) {
    //         throw new Error(err);
    //     }
    // }

    // async updateItem(cartitemid, data) {

    //     try {

    //         const cartItem = await CartItemModel.updateCartItem(cartitemid, data);

    //         return cartItem;

    //     } catch(err) {
    //         throw new Error(err);
    //     }
    // }

    // async removeItem(cartitemid) {

    //     try {

    //         const cartItem = await CartItemModel.deleteCartItem(cartitemid);

    //         return cartItem;

    //     } catch(err) {
    //         throw new Error(err);
    //     }
    // }

    // async checkout(cartid, userid, paymentinfo) {
        
    //     try {

    //         // list of cart items
    //         const cartItems = await CartItemModel.getCartItems(cartid);

    //         // generate total price from cart items
    //         const totalPrice = cartItems.reduce((totalPrice, item) => {
    //             return totalPrice += Number(item.price);
    //         }, 0);

    //         const Order = new OrderModel({ totalPrice, userid });
    //         Order.addItems(cartItems);
    //         await Order.createOrder();

    //         // payment method
    //         // TODO

    //         // order COMPLETE after successful payment process
    //         const order = Order.updateOrder({ status: "COMPLETE" });

    //         return order;

    //     } catch(err) {
    //         throw new Error(err);
    //     }
    // }
}