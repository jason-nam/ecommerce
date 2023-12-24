const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart");

module.exports = (app) => {

    app.use("/api/carts", router);

    router.post("/", controller.create);
    router.get("/", controller.getCart);
    router.delete("/empty", controller.emptyCart);

    router.post("/items", controller.addItem);
    router.post("/items/multi", controller.addMultiItems);
    router.put("/items/:cartitemid", controller.updateItem);
    router.delete("/items/:cartitemid", controller.removeItem);

    router.post("/checkout", controller.checkout);

}