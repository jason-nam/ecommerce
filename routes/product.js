const express = require("express");
const router = express.Router();

const controller = require("../controllers/product");

module.exports = (app) => {

    app.use("/products", router);
    app.use(express.urlencoded({ extended: false }));

    router.get("/", controller.list);
    router.get("/:productId", controller.get);

}