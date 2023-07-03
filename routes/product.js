const express = require("express");
const router = express.Router();

const ProductService = require("../services/productServices");
const ProductServiceInstance = new ProductService();

// const ProductModel = require("../models/product");
// const ProductModelInstance = new ProductModel();

module.exports = (app) => {

    app.use("/products", router);
    app.use(express.urlencoded({ extended: false }));

    router.get("/", async (req, res, next) => {
        try {

            const queryParams = req.query;
            const response = await ProductServiceInstance.list(queryParams);

            res.status(200).send(response);

        } catch(err) {
            // res.status(404).send(err);
            next(err);
        }
    });

    router.get("/:productId", async (req, res, next) => {
        try {
            
            const { productId } = req.params;
            const response = await ProductServiceInstance.get(productId);

            res.status(200).send(response);

        } catch(err) {
            // res.status(404).send(err);
            next(err);
        }
    });

}