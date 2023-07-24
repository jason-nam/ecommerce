const OrderService = require("../services/orderServices");
const OrderServiceInstance = new OrderService();

module.exports = {

    list: async (req, res, next) => {
        try {
            
            const { id } = req.user;

            const response = await OrderServiceInstance.list(id);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    get: async (req, res, next) => {
        try {
            
            const { orderid } = req.params;

            const response = await OrderServiceInstance.get(orderid);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    }
}