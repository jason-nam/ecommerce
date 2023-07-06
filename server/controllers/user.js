const UserService = require("../services/userServices");
const UserServiceInstance = new UserService();

module.exports = {

    get: async (req, res, next) => {
        try {

            const { userId } = req.params;
            const response = await UserServiceInstance.get(userId);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {

            const { userId } = req.params;
            const data = req.body;

            const response = await UserServiceInstance.update({ userId, ...data });

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    }
}