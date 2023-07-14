const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

module.exports = (app) => {

    app.use("/api/users", router);

    router.get("/:userid", controller.get); // get user
    router.put("/:userid", controller.update); // update user information

}
