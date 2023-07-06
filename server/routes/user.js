const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

module.exports = (app) => {

    app.use("/users", router);
    app.use(express.urlencoded({ extended: false }));

    router.get("/:userId", controller.get);
    router.put("/:userId", controller.update);

}
