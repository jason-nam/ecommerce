const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");
const subcategoryController = require("../controllers/subcategory");

module.exports = (app) => {

    app.use("/api/category", router);

    // Category routes
    router.get("/categories", categoryController.getAllCategories);
    router.get("/categories/:categoryId", categoryController.getCategoryById);
    router.post("/categories", categoryController.createCategory);
    router.put("/categories/:categoryId", categoryController.updateCategory);
    router.delete("/categories/:categoryId", categoryController.deleteCategory);

    // Subcategory routes
    router.get("/categories/:categoryId/subcategories", subcategoryController.getSubcategoriesByCategoryId);
    router.get("/subcategories/:subcategoryId", subcategoryController.getSubcategoryById);
    router.post("/categories/:categoryId/subcategories", subcategoryController.createSubcategory);
    router.put("/subcategories/:subcategoryId", subcategoryController.updateSubcategory);
    router.delete("/subcategories/:subcategoryId", subcategoryController.deleteSubcategory);
}
