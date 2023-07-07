const express = require("express");
const router = express.Router();

const controller = require("../controllers/authentication");

module.exports = (app) => {

    app.use("/api", router);
    app.use(express.urlencoded({ extended: false }));

    router.post("/register", controller.register); // registration endpoint
    router.post("/login", controller.login); // login endpoint

}