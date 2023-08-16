const ProductModel = require("../models/product");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {

    async list(options) {
        try {
            let { limit, page, search, category } = options;

            if (limit == null || isNaN(limit) || limit < 1) limit = 12;
            if (page == null || isNaN(page) || page < 1) page = 1;

            // load products list
            const products = await ProductModelInstance.getProducts(page, limit, search, category);
            const productsCount = await ProductModelInstance.getProductsCount(search, category);
            return {products: products, count: Number(productsCount[0].count)};

            // return products;

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

    async getProductsByCategory(categoryname) {
        try {

            const products = await ProductModel.getProductsByCategory(categoryname);

            return products;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getProductsBySubcategory(categoryname, subcategoryname) {
        try {

            const products = await ProductModel.getProductsBySubcategory(categoryname, subcategoryname);

            return products;

        } catch(err) {
            throw new Error(err);
        }
    }
}