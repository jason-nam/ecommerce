const express = require("express");
const router = express.Router();

const imageController = require("../controllers/image");

module.exports = (app) => {

    app.use("/api/image", router);

    // image routes
    router.get("/", imageController.getImagesByProductid);
    router.get("/:imageid", imageController.getImagesById);
    router.post("/create", imageController.createImage);
    router.put("/update/:imageid", imageController.updateImage);
    router.delete("/delete/:imageid", imageController.deleteImage);
}