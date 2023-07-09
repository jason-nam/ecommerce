const express = require("express");
const router = express.Router();
const { hashPasswordRoute } = require("../middleware/bcrypt");
const controller = require("../controllers/authentication");

// const passport = require('passport')


module.exports = (app, passport) => {

    app.use("/api", router);
    app.use(express.urlencoded({ extended: false }));

    router.post("/register", hashPasswordRoute, controller.register); // registration endpoint
    router.post("/login", controller.login); // login endpoint
    // router.post("/logout", controller.logout); // login endpoint
    // router.get("/abcd", (req, res, next) => {
    //     // console.log(req)
    //     if (req.isAuthenticated()) {
    //         console.log("abcd")
    //         return res.status(200).send("abcd")
    //     } else {
    //         console.log("not auth")
    //         return res.status(200).send("not auth")
    //     }
    // }); 


    /* another way */
    // router.post("/login", passport.authenticate('local'), controller.login); // login endpoint




}