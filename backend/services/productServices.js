const ProductModel = require("../models/product");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {

    async list(options) {

        try {

            // load products list
            const products = await ProductModelInstance.getProducts();

            return products;

        } catch(err) {
            throw new Error(err);
        }
    }

    async get(id) {

        try {
    
            // get product if product exists else return null
            const product = await ProductModelInstance.getProductById(id);

            // if no product is found throw 404 error
            if (!product) {
                throw createError(404, "Not Found");
            }

            return product;

        } catch(err) {
            throw new Error(err);
        }
    }
}