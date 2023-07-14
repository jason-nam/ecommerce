const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();

module.exports = {

    register: async (req, res, next) => {
        try {

            const data = req.body;
            const response = await AuthenticationServiceInstance.register(data);

            res.status(201).send(response);

        } catch(err) {

            if (err.status == 500 ) {
                res.status(500).send({message: "Server Error"});
            }
            if (err.status == 409) {
                res.status(409).send({message: "User already exists"});
            }
        }
    },

    login: async (req, res, next) => {

        if (req.isAuthenticated()) {
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