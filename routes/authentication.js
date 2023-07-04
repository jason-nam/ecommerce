const express = require("express");
const router = express.Router();

const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();

module.exports = (app) => {

    app.use("/", router);

    // registration endpoint
    router.post("/register", async (req, res, next) => {

        try {

            const data = req.body;
            const response = await AuthenticationServiceInstance.register(data);

            res.status(201).send(response); // 200 OK

        } catch(err) {
            next(err);
        }

    });

    // login endpoint
    router.post("/login", async (req, res, next) => {

        try {

            const data = req.body;
            const response = await AuthenticationServiceInstance.login(data);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }

    }) 

}