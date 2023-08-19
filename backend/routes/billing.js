const express = require("express");
const router = express.Router();

const billingController = require("../controllers/billing");

module.exports = (app) => {

    app.use("/api/billing", router);

    // Category routes
    router.get("/", billingController.getBillingsByUserid);
    router.get("/:billingid", billingController.getBillingById);
    router.post("/create", billingController.createBilling);
    router.put("/update/:billingid", billingController.updateBilling);
    router.delete("/delete/:billingid", billingController.deleteBilling);
}