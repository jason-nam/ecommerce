const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();

module.exports = {

    register: async (req, res, next) => {
        try {

            const data = req.body;
            const response = await AuthenticationServiceInstance.register(data);
            req.login(response, function(err) {
                if (err) { return res.status(500).send({message: "Login Error"}); }
                res.status(201).send(response);
            })

        } catch(err) {

            if (err.status == 500 ) {
                res.status(500).send({message: "Server Error"});
            }
            if (err.status == 409) {
                res.status(409).send({message: "Wrong credentials"});
            }
        }
    },

    login: async (req, res, next) => {
        if (req.isAuthenticated()) {
            /** 
             * TODO
             * - get user profile
             * - check if user is active
             *  1. if active, proceed.
             *  2. if not active, ask to restore account.
             */
            res.status(200).send(req.user);
        } else {
            res.status(401).send({message : 'Authentication Fail'});
        }     
    },

    logout: async (req, res, next) => {

        req.logout(function(err) {
            if (err) { 
                res.status(err.status).send({loggedOut: false, message: "Not Logged In"})
            } else {
                res.status(200).send({loggedOut: true, message: "Logged Out"});
            }
        });
    },

    checkAuth: async (req, res, next) => {

        if (req.isAuthenticated()) {
            res.status(200).send({loggedIn: true, user: req.user});
        } else {
            res.status(200).send({loggedIn: false})
        }
    }

}