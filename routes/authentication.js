const express = require("express");
const router = express.Router();

const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();

module.exports = (app) => {

    app.use("/authentication", router);

    // registration endpoint
    router.post("/register", async (req, res, next) => {

        try {
            const data = req.body;
            const response = await AuthenticationServiceInstance.register(data);
            res.status(200).send(response); // 200 OK
        } catch(err) {
            next(err);
        }

    });

    // login endpoint
    // TODO

}