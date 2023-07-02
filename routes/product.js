const express = require("express");
const router = express.Router();

module.exports = (app) => {
    
    app.use("/products", router);

    router.get("/", async (req, res, next) => {
        try {
            // TODO
        } catch(err) {
            next(err);
        }
    });

    router.get("/:productId", async (req, res, next) => {
        try {
            // TODO
        } catch(err) {
            next(err);
        }
    });
}