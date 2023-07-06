const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();

module.exports = {

    register: async (req, res, next) => {
        try {

            const data = req.body;
            const response = await AuthenticationServiceInstance.register(data);

            res.status(201).send(response); // 200 OK

        } catch(err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {

            const data = req.body;
            const response = await AuthenticationServiceInstance.login(data);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    }
}