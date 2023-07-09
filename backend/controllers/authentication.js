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
            res.status(409).send({"message": "User Registration Fail"});
            // next(err);
        }
    },

    login: async (req, res, next) => {

        passport.authenticate('local', (err, user) => {
            if (err) {
                if (err.status == 500) return res.status(500).send({ message : 'Server Error' });
                return res.status(err.status).send({message: 'Something went wrong'})
            }
            if (!user) { 
                return res.status(401).send({ message : 'Authentication Fail' });
            }
            req.session.authenticated = true;
            return res.status(200).send(user); 
        })(req, res, next);
              
        
        /* another way */

        // router.post("/login", passport.authenticate('local'), (req, res, err) => {
        //     if (err) {
        //         console.log(err)
        //         return;
        //     }
        //     if(req.user)  return res.status(200).send(req.user);
        //     return res.status(404).send(res);
        // });

        /* pre-Passport */

        // try {
        //     const { username, password } = req.body;
        //     const response = await AuthenticationServiceInstance.login({ email: username, password });
        //     console.log(response)
        //     res.status(200).send(response);
        // } catch(err) {
        //     res.status(401).send({"message": "Authentication Fail"});
        //     // next(err);
        // }
    },

    logout: async (req, res, next) => {
        if (req.session.authenticated) {
            req.session.destroy();
            res.status(200).send(res);
        } else 
            res.status(403).send({message: "Not logged in"})
    }
}