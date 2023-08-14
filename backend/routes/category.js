const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");
const subcategoryController = require("../controllers/subcategory");

module.exports = (app) => {

    app.use("/api/category", router);

    // Category routes
    router.get("/categories", categoryController.getAllCategories);
    router.get("/categories/:categoryid", categoryController.getCategoryById);
    router.post("/categories", categoryController.createCategory);
    router.put("/categories/:categoryid", categoryController.updateCategory);
    router.delete("/categories/:categoryid", categoryController.deleteCategory);

    // Subcategory routes
    router.get("/categories/:categoryid/subcategories", subcategoryController.getSubcategoriesByCategoryId);
    router.get("/subcategories/:subcategoryid", subcategoryController.getSubcategoryById);
    router.post("/categories/:categoryid/subcategories", subcategoryController.createSubcategory);
    router.put("/subcategories/:subcategoryid", subcategoryController.updateSubcategory);
    router.delete("/subcategories/:subcategoryid", subcategoryController.deleteSubcategory);
}
