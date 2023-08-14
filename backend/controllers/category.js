const CategoryService = require("../services/categoryServices");
const CategoryServiceInstance = new CategoryService();

module.exports = {

    getAllCategories: async (req, res, next) => {
        try {
            const response = await CategoryServiceInstance.getAllCategories();

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getCategoryById: async (req, res, next) => {
        try {
            
            const { categoryid } = req.params;
            const response = await CategoryServiceInstance.getCategoryById(categoryid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    },

    createCategory: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    },

    updateCategory: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            //TODO

        } catch(err) {
            res.status(404).send({"message": "Product does not exist"});
            next(err);
        }
    }
}