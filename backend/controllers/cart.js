const CartService = require("../services/cartServices");
const CartServiceInstance = new CartService();

module.exports = {

    create: async (req, res, next) => {
        try {

            const { id } = req.user;
            const response = await CartServiceInstance.create(id);

        } catch(err) {
            next(err);
        }
    },

    getCart: async (req, res, next) => {

        try {

            const { id } = req.user;

            const response = await CartServiceInstance.getCart(id);
            res.status(200).send({rows: response.rows, items: response.items});

        } catch(err) {
            next(err);
        }
    },

    addItem: async (req, res, next) => {
        try {
            
            const { id } = req.user;
            const data = req.body;
            const response = await CartServiceInstance.addItem(id, data);
            
            res.status(200).send({item: response.rows[0]});

        } catch(err) {
            next(err);
        }
    },

    addMultiItems: async(req, res, next) => {
        try {
            const { id } = req.user;

            const data = req.body.items;
            const response = await CartServiceInstance.addMultiItems(id, data);
            res.status(200).send({cart: response});

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

            const { id } = req.user;

            const { cartid, paymentinfo } = req.body;
            const response = await CartServiceInstance.checkout(cartid, id, paymentinfo);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    }
}