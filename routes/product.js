const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product")
const ProductModelInstance = new ProductModel();


module.exports = (app) => {

    app.use("/products", router)
    app.use(express.urlencoded({ extended: false }))

    
    router.get("/", async (req, res, next) => {
        try {
            // TODO
            res.status(200).send(await ProductModelInstance.getProducts());
        } catch(err) {
            res.status(404).send(err);
            // next(err);
        }
    });

    router.get("/:id", async (req, res, next) => {
        try {
            // TODO
            res.status(200).send(await ProductModelInstance.getProductById(parseInt(req.params.id)));
        } catch(err) {
            res.status(404).send(err);
            // next(err);
        }
    });

}