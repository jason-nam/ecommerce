const CartService = require("../services/cartServices");
const CartServiceInstance = new CartService();

module.exports = {

    create: async (req, res, next) => {
        try {

            const { id } = req.user;
            const response = await CartServiceInstance.create(id);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    getCart: async (req, res, next) => {
        try {
            
            const { id } = req.user;
            const response = await CartServiceInstance.getCart(id);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    addItem: async (req, res, next) => {
        try {
            
            // TODO

        } catch(err) {
            next(err);
        }
    },

    updateItem: async (req, res, next) => {
        try {

            // TODO

        } catch(err) {
            next(err);
        }
    },

    removeItem: async (req, res, next) => {
        try {

            // TODO

        } catch(err) {
            next(err);
        }
    },

    checkout: async(req, res, next) => {
        try {

            // TODO

        } catch(err) {
            next(err);
        }
    }
}