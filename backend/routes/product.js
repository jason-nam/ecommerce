const express = require("express");
const router = express.Router();

const controller = require("../controllers/product");

module.exports = (app) => {

    app.use("/api/products", router);

    router.get("/", controller.list); // list all products
    router.get("/:productid", controller.get); // get product

    router.get("/:categoryname/:subcategoryname", controller.getProductsBySubcategory);
    router.get("/:categoryname", controller.getProductsByCategory);

}