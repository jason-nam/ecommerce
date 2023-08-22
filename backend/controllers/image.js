const ImageService = require("../services/imageServices");
const ImageServiceInstance = new ImageService();

module.exports = {

    getImagesByProductid: async (req, res, next) => {
        try {
            
            const { productid } = req.body;
            const response = await ImageServiceInstance.getImagesByProductid(productid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getImagesById: async (req, res, next) => {
        try {
            
            const { imageid } = req.params;
            const response = await ImageServiceInstance.getImagesById(imageid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    createImage: async (req, res, next) => {
        try {
            
            const { productid, ...data } = req.body;
            const response = await ImageServiceInstance.createImage({ productid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    updateImage: async (req, res, next) => {
        try {
            
            const { imageid } = req.params;
            const data = req.body;
            const response = await ImageServiceInstance.updateImage({ imageid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    deleteImage: async (req, res, next) => {
        try {
        
            const { imageid } = req.params;
            const response = await ImageServiceInstance.deleteImage(imageid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    }
}