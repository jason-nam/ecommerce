const express = require("express");
const router = express.Router();
const { hashPasswordRoute } = require("../middleware/bcrypt");
const controller = require("../controllers/authentication");

module.exports = (app, passport) => {

    app.use("/api", router);

    router.post("/register", hashPasswordRoute, controller.register); // registration endpoint    
    
    router.get("/logout", controller.logout); // logout user
    router.post("/login", passport.authenticate("local",{ passReqToCallback: true }), controller.login);

    router.get("/checkAuth", controller.checkAuth); // check login status
    
}