const express = require("express");
const router = express.Router();

const controller = require("../controllers/order");

module.exports = (app) => {

    app.use("/api/orders", router);

    router.get("/", controller.list);
    router.get("/:orderid", controller.get);

}