const OrderModel = require("../models/order");
const OrderItemModel = require("../models/orderItem");

module.exports = class OrderService {

    async create(data) {

        const { userid } = data;

        try {
            const Order = new OrderModel();
            const order = await Order.createOrder({ userid, total });

            return order;

        } catch(err) {
            throw new Error(err);
        }
    }

    async list(userid) {

        try {
            const orders = await OrderModel.getOrderByUser(userid);

            return orders;

        } catch(err) {
            throw new Error(err);
        }
    }

    async get(orderid) {

        try {
            const order = await OrderModel.getOrderById(orderid);

            return order;

        } catch(err) {
            throw new Error(err);
        }
    }
}