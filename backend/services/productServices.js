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

    async getProductsByCategory(categoryname, queryParams) {
        try {

            let { limit, page } = queryParams;
            if (limit == null || isNaN(limit) || limit < 1) limit = 12;
            if (page == null || isNaN(page) || page < 1) page = 1;

            const products = await ProductModel.getProductsByCategory(categoryname, limit, page);

            return products;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getProductsBySubcategory(categoryname, subcategoryname, queryParams) {
        try {

            let { limit, page } = queryParams;
            if (limit == null || isNaN(limit) || limit < 1) limit = 12;
            if (page == null || isNaN(page) || page < 1) page = 1;

            const products = await ProductModel.getProductsBySubcategory(categoryname, subcategoryname, limit, page);

            return products;

        } catch(err) {
            throw new Error(err);
        }
    }
}