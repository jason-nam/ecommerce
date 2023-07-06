const ProductService = require("../services/productServices");
const ProductServiceInstance = new ProductService();

module.exports = {

    list: async (req, res, next) => {
        try {

            const queryParams = req.query;
            const response = await ProductServiceInstance.list(queryParams);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":"404"});
            next(err);
        }
    },

    get: async (req, res, next) => {
        try {
            
            const { productId } = req.params;
            const response = await ProductServiceInstance.get(productId);

            res.status(200).send(response);


        } catch(err) {
            res.status(404).send({"message":"Product does not exist"});
            next(err);
        }
    }
}