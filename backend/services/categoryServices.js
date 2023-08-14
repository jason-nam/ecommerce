const CategoryModel = require("../models/category");
const CategoryModelInstance = new CategoryModel();
const SubcategoryModel = require("../models/subcategory");
const SubcategoryModelInstance = new SubcategoryModel();

module.exports = class ProductService {

    async getAllCategories() {

        try {

            const categories = await CategoryModel.getAllCategories();
            const subcategories = await SubcategoryModel.getAllSubcategories();

            categories.subcategories = subcategories;
            return categories;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getCategoryById(id) {

        try {

            //TODO

        } catch(err) {
            throw new Error(err);
        }
    }
}