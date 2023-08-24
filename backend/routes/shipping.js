const express = require("express");
const router = express.Router();

const shippingController = require("../controllers/shipping");

module.exports = (app) => {

    app.use("/api/shipping", router);

    // shipping routes
    router.get("/", shippingController.getShippingByUserid);
    router.get("/:shippingid", shippingController.getShippingById);
    router.post("/create", shippingController.createShipping);
    router.put("/update/:shippingid", shippingController.updateShipping);
    router.delete("/delete/:shippingid", shippingController.deleteShipping);
}