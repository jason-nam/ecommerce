const UserService = require("../services/userServices");
const UserServiceInstance = new UserService();

module.exports = {

    get: async (req, res, next) => {
        try {

            const { id } = req.user;
            const response = await UserServiceInstance.get(id);

            res.status(200).send(response);

        } catch(err) {
            res.status(401).send({message:"Not Authorized"});
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {

            const { userid } = req.params;
            const data = req.body;
            const response = await UserServiceInstance.update({ userid, ...data });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"User Info Edit Fail"});
            next(err);
        }
    },

    updateName: async (req, res, next) => {
        try {

            const { userid } = req.params;
            const { firstname, lastname } = req.body;
            const response = await UserServiceInstance.update({ userid, firstname, lastname });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"User Name Edit Fail"});
            next(err);
        }
    },

    updateEmail: async (req, res, next) => {
        try {

            const { userid } = req.params;
            const { email } = req.body;
            const response = await UserServiceInstance.update({ userid, email });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"User Email Edit Fail"});
            next(err);
        }
    },

    updatePassword: async (req, res, next) => {
        try {

            const { userid } = req.params;
            const { password } = req.body;
            const response = await UserServiceInstance.updatePassword({ userid, password });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"User Password Edit Fail"});
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {

            const { userid } = req.params;
            const response = await UserServiceInstance.deleteUser({ userid });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"Failed to Delete User Account"});
            next(err);
        }
    },

    deactivate: async (req, res, next) => {
        try {

            const { userid } = req.params;
            const response = await UserServiceInstance.deactivateUser({ userid });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"Failed to Deactivate User Account"});
            next(err);
        }
    },

    restore: async (req, res, next) => {
        try {

            const { userid } = req.params;
            const response = await UserServiceInstance.reactivateUser({ userid });

            res.status(204).send(response);

        } catch(err) {
            res.status(400).send({"message":"Failed to Restore User Account"});
            next(err);
        }
    }
}