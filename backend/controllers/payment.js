const PaymentService = require("../services/paymentServices");
const PaymentServiceInstance = new PaymentService();

module.exports = {

    getPaymentsByUserid: async (req, res, next) => {
        try {
            
            const { id } = req.user;
            const response = await PaymentServiceInstance.getPaymentsByUserid(id);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getPaymentById: async (req, res, next) => {
        try {
            
            const { paymentid } = req.params;
            const response = await PaymentServiceInstance.getPaymentById(paymentid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    createPayment: async (req, res, next) => {
        try {
            
            const { id: userid } = req.user;
            const data = req.body;
            const response = await PaymentServiceInstance.createPayment({ userid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    updatePayment: async (req, res, next) => {
        try {
            
            const { paymentid } = req.params;
            const data = req.body;
            const response = await PaymentServiceInstance.updatePayment({ paymentid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    deletePayment: async (req, res, next) => {
        try {
        
            const { paymentid } = req.params;
            const response = await PaymentServiceInstance.deletePayment(paymentid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    }
}