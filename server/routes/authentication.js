const express = require("express");
const router = express.Router();
const { hashPasswordRoute } = require("../middleware/bcrypt");
const controller = require("../controllers/authentication");

// const passport = require('passport')
// const initializePassport = require('../passport-config')


module.exports = (app, passport) => {

    app.use("/api", router);
    app.use(express.urlencoded({ extended: false }));

    router.post("/register", hashPasswordRoute, controller.register); // registration endpoint
    router.post("/login", passport.authenticate('local'), controller.login); // login endpoint

    // initializePassport(passport)
    // router.post("/login", passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/login',
    //   }));

    // router.post("/login", passport.authenticate('local'), (req, res) => {
    //     if(req.user) {
    //         const user = req.user;
    //         return res.status(200).send(user);
    //     }
    //     return res.sendStatus(404);
    // });

}