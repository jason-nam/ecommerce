const ImageModel = require("../models/image");
const ImageModelInstance = new ImageModel();

module.exports = class ImageService {

    // image model

    async getImagesByProductid(productid) {
        try {

            const images = await ImageModel.getImagesByProductid(productid);
            return images;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getImagesById(imageid) {
        try {

            const image = await ImageModel.getImagesById(imageid);
            return image;

        } catch(err) {
            throw new Error(err);
        }
    }

    async createImage(data) {
        try {

            const { productid, image: imageurl } = data;

            const image = await ImageModelInstance.createImage(productid, imageurl);
            return image;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateImage(data) {
        try {

            const { imageid, image: imageurl } = data;

            const image = await ImageModel.updateImage(imageid, imageurl);
            return image;

        } catch(err) {
            throw new Error(err);
        }
    }

    async deleteImage(imageid) {
        try {

            const image = await ImageModel.deleteImage(imageid);
            return image;

        } catch(err) {
            throw new Error(err);
        }
    }
}