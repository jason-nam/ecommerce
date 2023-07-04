const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart");

module.exports = (app) => {

    app.use("/carts", router);
    app.use(express.urlencoded({ extended: false }));

    router.post("/", controller.create);
    router.post("/", controller.addItem);
    router.get("/", controller.loadCart);
    router.put("/", controller.updateItem);
    router.delete("/", controller.removeItem);

}