const express = require("express");
const router = express.Router();

const UserService = require("../services/userServices");
const UserServiceInstance = new UserService();


module.exports = (app) => {

    app.use("/users", router);
    app.use(express.urlencoded({ extended: false }));

    router.get("/:userId", async (req, res, next) => {

        try {

            const { userId } = req.params;
            const response = await UserServiceInstance.get(userId);

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    })

    router.put("/:userId", async (req, res, next) => {
        
        try {

            const { userId } = req.params;
            const data = req.body;

            const response = await UserServiceInstance.update({ userId, ...data });

            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    })
}
