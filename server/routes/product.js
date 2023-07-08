const express = require("express");
const router = express.Router();

const controller = require("../controllers/product");

module.exports = (app) => {

    app.use("/api/products", router);

    router.get("/", controller.list);
    router.get("/:productid", controller.get);

}