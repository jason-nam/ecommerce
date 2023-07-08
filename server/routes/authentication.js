const express = require("express");
const router = express.Router();
const { hashPasswordRoute } = require("../middleware/bcrypt");

const controller = require("../controllers/authentication");
//temp
const passport = require('passport')
const initializePassport = require('../passport-config')


module.exports = (app) => {

    app.use("/api", router);

    router.post("/register", hashPasswordRoute, controller.register); // registration endpoint
    // router.post("/login", controller.login); // login endpoint

    initializePassport(passport)
    router.post("/login", passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
      }));

    // router.post("/login", passport.authenticate('local'), (req, res) => {
    //     if(req.user) {
    //         const user = req.user;
    //         return res.status(200).send(user);
    //     }
    //     return res.sendStatus(404);
    // });
    



}