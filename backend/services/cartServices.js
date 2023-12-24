const CartModel = require("../models/cart");
const CartModelInstance = new CartModel();
const CartItemModel = require("../models/cartItem");
const OrderModel = require("../models/order");
const ProductModel = require("../models/product");
const BillingModel = require("../models/billing");
const BillingModelInstance = new BillingModel();
const PaymentModel = require("../models/payment");
const PaymentModelInstance = new PaymentModel();

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

    async emptyCart(userid) {
        try {
            const cart = await CartModel.getByUser(userid);
            const cartid = cart.rows[0].id;
            const deletedItems = await CartItemModel.emptyCartItems(cartid);

            return deletedItems;

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

    async checkout(cart, userid, paymentinfo) {
        try {

            // list of cart items
            const promises = cart.map(async cartitem => {
                let ProductModelInstance = new ProductModel();
                let product = await ProductModelInstance.getProductById(cartitem.id);
                product[0].qty = cartitem.qty
                return product;
            })
            const cartItems = (await Promise.allSettled(promises)).map(x => x.value[0]);

            // generate total price from cart items
            const subtotal = cartItems.reduce((acc, item) => {
                return acc += Number(item.price) * item.qty;
            }, 0);
            const tax = (subtotal * 0.13).toFixed(2)
            const shipping = 0;
            const total = parseFloat(subtotal) + parseFloat(tax) + parseFloat(shipping);

            if (userid == -1) {
                userid = null;
            }

            // create new order
            const Order = new OrderModel({ total, userid });

            Order.addItems(cartItems);
            await Order.createOrder();

            // payment method
            // ECRYPT
            // const payment = PaymentModelInstance.createPayment(
            //     userid, name_on_card, addr_line_1, addr_line_2, 
            //     addr_city, addr_province, addr_postal, 
            //     phone_number, encrypted_card, encrypted_exp)
            // const billing = BillingModelInstance.createBilling(userid, paymentid, amount, payment_date, payment_status)

            // order COMPLETE after successful payment process
            const order = await Order.updateOrder({ status: "COMPLETE" });
            order.cartItems = cartItems
            return order;

        } catch(err) {
            throw new Error(err);
        }
    }
}