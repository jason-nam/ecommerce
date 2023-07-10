const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();
const passport = require('passport')

module.exports = {

    register: async (req, res, next) => {
        try {

            const data = req.body;
            const response = await AuthenticationServiceInstance.register(data);

            res.status(201).send(response);

        } catch(err) {
            if (err.status == 500 )
                res.status(500).send({message: "Server Error"});
            if (err.status == 409)
                res.status(409).send({message: "User already exists"});
            // next(err);
        }
    },

    login: async (req, res, next) => {
        if (req.isAuthenticated())
            res.status(200).send(req.user);
        else
            res.status(401).send({message : 'Authentication Fail'})

        /* another way */
        /* custom callback - not working */
        // ,(err, user) => {
        //     if (err) {
        //         if (err.status == 500) return res.status(500).send({ message : 'Server Error' });
        //         return res.status(err.status).send({message: 'Something went wrong'})
        //     }
        //     if (!user) { 
        //         return res.status(401).send({ message : 'Authentication Fail' });
        //     }
        //     req.session.user = user;
        //     return res.status(200).send(user); 
        // })(req, res, next);
              
    },

    logout: async (req, res, next) => {

        /* another way*/
        // if (req.isAuthenticated()) {
        //     req.session.destroy();
        //     res.status(200).send({loggedOut: true, message: "Logged Out"});
        // } else 
        //     res.status(403).send({loggedOut: false, message: "Not Logged In"})

        req.logout(function(err) {
            if (err) { res.status(err.status).send({loggedOut: false, message: "Not Logged In"})}
            res.status(200).send({loggedOut: true, message: "Logged Out"});
          });
    },

    checkAuth: async (req, res, next) => {

        if (req.isAuthenticated()) {
            res.status(200).send({loggedIn: true, user: req.user});
        } else 
            res.status(200).send({loggedIn: false})
    }

}