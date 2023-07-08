const express = require("express");
const router = express.Router();
const { hashPasswordRoute } = require("../middleware/bcrypt");

const controller = require("../controllers/authentication");

module.exports = (app) => {

    app.use("/api", router);

    router.post("/register", hashPasswordRoute, controller.register); // registration endpoint
    router.post("/login", controller.login); // login endpoint

}