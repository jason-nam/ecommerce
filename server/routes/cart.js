const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart");

module.exports = (app) => {

    app.use("/carts", router);
    app.use(express.urlencoded({ extended: false }));

    router.post("/mycart", controller.create);
    router.post("/mycart/items", controller.addItem);
    router.post("/mycart/checkout", controller.checkout);
    router.get("/mycart", controller.getCart);
    router.put("/mycart/items/:cartItemId", controller.updateItem);
    router.delete("/mycart/items/:cartItemId", controller.removeItem);

}