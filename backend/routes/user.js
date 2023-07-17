const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

module.exports = (app) => {

    app.use("/api/users", router);

    router.get("/profile", controller.get); // get user

    router.put("/:userid", controller.update); // update user information
    
    router.put("/email/:userid", controller.updateEmail); // update user email
    router.put("/name/:userid", controller.updateName); // update user name
    router.put("/password/:userid", controller.updatePassword); // update user password

    router.delete("/delete/:userid", controller.delete); // delete user from database
    router.put("/deactivate/:userid", controller.deactivate); // deactivate user account
    router.put("/restore/:userid", controller.restore); // reactivate user account

}
