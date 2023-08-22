const db = require("../db");

module.exports = class ImageModel {

    constructor(data = {}) {

    }

    static async getImagesByProductid(productid) {
        try {

            const statement = `SELECT *
                               FROM images
                               WHERE productid = $1`;
            const values = [productid];

            const result = await db.query(statement, values);

            if (result.rows) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async getImagesById(imageid) {
        try {

            const statement = `SELECT *
                               FROM images
                               WHERE id = $1
                               LIMIT 1`;
            const values = [imageid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    async createImage(productid, image) {
        try {

            const statement = `INSERT INTO images (productid, image)
                               VALUES ($1, $2)
                               RETURNING *`;
            const values = [productid, image];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async updateImage(imageid, image) {
        try {

            const statement = `UPDATE images
                               SET image = $2, 
                               WHERE id = $1
                               RETURNING *`;
            const values = [imageid, image];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }

    static async deleteImage(imageid) {
        try {

            const statement = `DELETE
                               FROM images
                               WHERE id = $1
                               RETURNING *`;
            const values = [imageid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result;
            }

            return null;

        } catch(err) {
            throw new Error(500, err);
        }
    }
}