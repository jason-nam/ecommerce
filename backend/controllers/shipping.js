const ShippingService = require("../services/shippingServices");
const ShippingServiceInstance = new ShippingService();

module.exports = {

    getShippingByUserid: async (req, res, next) => {
        try {
            
            const { id } = req.user;
            const response = await ShippingServiceInstance.getShippingByUserid(id);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getShippingById: async (req, res, next) => {
        try {
            
            const { shippingid } = req.params;
            const response = await ShippingServiceInstance.getShippingById(shippingid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    createShipping: async (req, res, next) => {
        try {
            
            try {
                const { id: userid } = req.user;
                const data = req.body;
                const response = await ShippingServiceInstance.createShipping({ userid, ...data });

                res.status(200).send(response);
            } catch {
                console.log("user is not registered: shipping address created as guest");
                const userid = null;
                const data = req.body;
                const response = await ShippingServiceInstance.createShipping({ userid, ...data });

                res.status(200).send(response);
            }
            
        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    updateShipping: async (req, res, next) => {
        try {
            
            const { shippingid } = req.params;
            const data = req.body;
            const response = await ShippingServiceInstance.updateShipping({ shippingid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    deleteShipping: async (req, res, next) => {
        try {
        
            const { shippingid } = req.params;
            const response = await ShippingServiceInstance.deleteShipping(shippingid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    }
}