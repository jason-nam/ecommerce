const CategoryService = require("../services/categoryServices");
const CategoryServiceInstance = new CategoryService();

module.exports = {

    getSubcategoriesByCategoryId: async (req, res, next) => {
        try {
            
            const { categoryid } = req.params;
            const response = await CategoryServiceInstance.getSubcategoriesByCategoryId(categoryid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message": "404"});
            next(err);
        }
    },

    getSubcategoryById: async (req, res, next) => {
        try {
            
            const { subcategoryid } = req.params;
            const response = await CategoryServiceInstance.getSubcategoryById(subcategoryid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    createSubcategory: async (req, res, next) => {
        try {
            
            const { categoryid } = req.params;
            const data = req.body;
            const response = await CategoryServiceInstance.createSubcategory({ categoryid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    updateSubcategory: async (req, res, next) => {
        try {
            
            const { subcategoryid } = req.params;
            const data = req.body;
            const response = await CategoryServiceInstance.updateSubcategory({ subcategoryid, ...data });

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    },

    deleteSubcategory: async (req, res, next) => {
        try {
            
            const { subcategoryid } = req.params;
            const response = await CategoryServiceInstance.deleteSubcategory(subcategoryid);

            res.status(200).send(response);

        } catch(err) {
            res.status(404).send({"message":  "404"});
            next(err);
        }
    }
}