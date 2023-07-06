const UserService = require("../services/userServices");
const UserServiceInstance = new UserService();

module.exports = {

    get: async (req, res, next) => {
        try {

            const { userId } = req.params;
            const response = await UserServiceInstance.get(userId);
            res.status(200).send(response);

        } catch(err) {
            res.status(404).send("Does not exist");
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {

            const { userId } = req.params;
            const data = req.body;

            const response = await UserServiceInstance.update({ userId, ...data });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send();
            next(err);
        }
    }
}