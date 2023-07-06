const UserService = require("../services/userServices");
const UserServiceInstance = new UserService();

module.exports = {

    get: async (req, res, next) => {
        try {

            const { userId } = req.params;
            const response = await UserServiceInstance.get(userId);
            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":"User does not exist"});
        }
    },

    update: async (req, res, next) => {
        try {

            const { userId } = req.params;
            const data = req.body;

            const response = await UserServiceInstance.update({ userId, ...data });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"User Info Edit Fail"});
        }
    }
}