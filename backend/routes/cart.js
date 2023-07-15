const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart");

module.exports = (app) => {

    app.use("/api/carts", router);

    router.post("/mycart", controller.create);
    router.get("/mycart", controller.getCart);

    router.post("/mycart/items", controller.addItem);
    router.post("/mycart/items/multi", controller.addMultiItems);
    router.put("/mycart/items/:cartitemid", controller.updateItem);
    router.delete("/mycart/items/:cartitemid", controller.removeItem);

    router.post("/mycart/checkout", controller.checkout);

}