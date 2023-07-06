const CartService = require("../services/cartServices");
const CartServiceInstance = new CartService();

module.exports = {

    create: async (req, res, next) => {
        try {

            const { userId } = req.body;
            const response = await CartServiceInstance.create(userId);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    getCart: async (req, res, next) => {
        try {
            
            const { userId } = req.body;
            const response = await CartServiceInstance.getCart(userId);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    addItem: async (req, res, next) => {
        try {
            
            const { userId, ...data } = req.body;
            // const data = req.body;

            const response = await CartServiceInstance.addItem(userId, data);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    updateItem: async (req, res, next) => {
        try {

            const { cartItemId } = req.params;
            const data = req.body;

            const response = await CartServiceInstance.updateItem(cartItemId, data);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    removeItem: async (req, res, next) => {
        try {

            const { cartItemId } = req.params;

            const response = await CartServiceInstance.removeItem(cartItemId);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    checkout: async(req, res, next) => {
        try {

            const { userId, cartId, paymentInfo } = req.body;

            const response = await CartServiceInstance.checkout(cartId, userId, paymentInfo);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    }
}