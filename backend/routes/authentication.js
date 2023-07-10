const express = require("express");
const router = express.Router();
const { hashPasswordRoute } = require("../middleware/bcrypt");
const controller = require("../controllers/authentication");

module.exports = (app, passport) => {

    app.use("/api", router);

    router.get("/login", controller.checkAuth);
    router.get("/logout", controller.logout);
    router.get("/", controller.checkAuth)

    router.post("/register", hashPasswordRoute, controller.register); // registration endpoint    
    router.post("/login", passport.authenticate("local",{ passReqToCallback: true }), controller.login);
 

}