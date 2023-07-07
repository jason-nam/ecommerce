const CartService = require("../services/cartServices");
const CartServiceInstance = new CartService();

module.exports = {

    create: async (req, res, next) => {
        try {

            const { userid } = req.body;
            const response = await CartServiceInstance.create(userid);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    getCart: async (req, res, next) => {
        try {
            
            const { userid } = req.body;
            const response = await CartServiceInstance.getCart(userid);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    addItem: async (req, res, next) => {
        try {
            
            const { userid, ...data } = req.body;
            const response = await CartServiceInstance.addItem(userid, data);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    updateItem: async (req, res, next) => {
        try {

            const { cartitemid } = req.params;
            const data = req.body;
            const response = await CartServiceInstance.updateItem(cartitemid, data);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    removeItem: async (req, res, next) => {
        try {

            const { cartitemid } = req.params;
            const response = await CartServiceInstance.removeItem(cartitemid);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    checkout: async(req, res, next) => {
        try {

            const { userid, cartid, paymentinfo } = req.body;
            const response = await CartServiceInstance.checkout(cartid, userid, paymentinfo);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    }
}