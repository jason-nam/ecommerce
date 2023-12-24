const BillingService = require("../services/billingServices");
const BillingServiceInstance = new BillingService();

module.exports = {

    getBillingsByUserid: async (req, res, next) => {
        try {
            
            const { id } = req.user;
            const response = await BillingServiceInstance.getBillingsByUserid(id);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getBillingById: async (req, res, next) => {
        try {
            
            const { billingid } = req.params;
            const response = await BillingServiceInstance.getBillingById(billingid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    createBilling: async (req, res, next) => {
        try {
            
            const { id: userid } = req.user;
            const data = req.body;
            const response = await BillingServiceInstance.createBilling({ userid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    updateBilling: async (req, res, next) => {
        try {
            
            const { billingid } = req.params;
            const data = req.body;
            const response = await BillingServiceInstance.updateBilling({ billingid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    deleteBilling: async (req, res, next) => {
        try {
        
            const { billingid } = req.params;
            const response = await BillingServiceInstance.deleteBilling(billingid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    }
}