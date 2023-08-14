const CategoryService = require("../services/categoryServices");
const CategoryServiceInstance = new CategoryService();

module.exports = {

    getSubcategoriesByCategoryId: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getSubcategoryById: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    },

    createSubcategory: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    },

    updateSubcategory: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    },

    deleteSubcategory: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    }
}