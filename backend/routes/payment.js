const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");

module.exports = (app) => {

    app.use("/api/payment", router);

    // Payment routes
    router.get("/", paymentController.getPaymentsByUserid);
    router.get("/:paymentid", paymentController.getPaymentById);
    router.post("/create", paymentController.createPayment);
    router.put("/update/:paymentid", paymentController.updatePayment);
    router.delete("/delete/:paymentid", paymentController.deletePayment);
}