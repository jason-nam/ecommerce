const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart");

module.exports = (app) => {

    app.use("/carts", router);
    app.use(express.urlencoded({ extended: false }));

    router.post("/:userId", controller.create);
    router.post("/:userId/items", controller.addItem);
    router.post("/:userId/checkout", controller.checkout);
    router.get("/:userId", controller.getCart);
    router.put("/:userId/items/:cartItemId", controller.updateItem);
    router.delete("/:userId/items/:cartItemId", controller.removeItem);

}