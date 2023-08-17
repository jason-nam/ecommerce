const ProductService = require("../services/productServices");
const ProductServiceInstance = new ProductService();

module.exports = {

    list: async (req, res, next) => {
        try {
            const queryParams = req.query;
            const response = await ProductServiceInstance.list(queryParams);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    get: async (req, res, next) => {
        try {
            
            const { productid } = req.params;
            const response = await ProductServiceInstance.get(productid);

            res.status(200).send(response);


        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    },

    getProductsByCategory: async (req, res, next) => {
        try {
            const queryParams = req.query;
            const { categoryname } = req.params;
            const response = await ProductServiceInstance.getProductsByCategory(categoryname, queryParams);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getProductsBySubcategory: async (req, res, next) => {
        try {
            const queryParams = req.query;
            const { categoryname, subcategoryname } = req.params;
            const response = await ProductServiceInstance.getProductsBySubcategory(categoryname, subcategoryname, queryParams);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    }
}