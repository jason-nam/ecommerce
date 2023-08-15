const CategoryModel = require("../models/category");
const CategoryModelInstance = new CategoryModel();
const SubcategoryModel = require("../models/subcategory");
const SubcategoryModelInstance = new SubcategoryModel();

module.exports = class ProductService {

    // category model

    async getAllCategories() {
        try {

            const categories = await CategoryModel.getAllCategories();
            const subcategories = await SubcategoryModel.getAllSubcategories();

            let data = [];
            for (const c of categories.rows) {
                let obj = { name: c.name, sub: []}
                for (const sc of subcategories.rows)
                    if (sc.categoryid === c.id) {
                        obj.sub.push(sc.name)
                    }
                data.push(obj)
            }
            
            return { data };


        } catch(err) {
            throw new Error(err);
        }
    }

    async getCategoryById(categoryid) {
        try {

            const category = await CategoryModel.getCategoryById(categoryid);
            return category;

        } catch(err) {
            throw new Error(err);
        }
    }

    async createCategory(data) {
        try {

            const { name } = data;
            const category = await CategoryModelInstance.createCategory(name);
            return category;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateCategory(data) {
        try {

            const { categoryid, name } = data;
            const category = await CategoryModel.updateCategory(categoryid, name);
            return category;

        } catch(err) {
            throw new Error(err);
        }
    }

    async deleteCategory(categoryid) {
        try {

            const category = await CategoryModel.deleteCategory(categoryid);
            return category;

        } catch(err) {
            throw new Error(err);
        }
    }

    // subcategory model

    async getSubcategoriesByCategoryId(categoryid) {
        try {

            const subcategories = await SubcategoryModel.getSubcategoriesByCategoryId(categoryid);
            return subcategories;

        } catch(err) {
            throw new Error(err);
        }
    }

    async getSubcategoryById(subcategoryid) {
        try {

            const subcategory = await SubcategoryModel.getSubcategoryById(subcategoryid);
            return subcategory;

        } catch(err) {
            throw new Error(err);
        }
    }

    async createSubcategory(data) {
        try {

            const { categoryid, name } = data;
            const subcategory = await SubcategoryModelInstance.createSubcategory(categoryid, name);
            return subcategory;

        } catch(err) {
            throw new Error(err);
        }
    }

    async updateSubcategory(data) {
        try {

            const { subcategoryid, name } = data;
            const subcategory = await SubcategoryModel.updateSubcategory(subcategoryid, name);
            return subcategory;

        } catch(err) {
            throw new Error(err);
        }
    }

    async deleteSubcategory(subcategoryid) {
        try {

            const subcategory = await SubcategoryModel.deleteSubcategory(subcategoryid);
            return subcategory;

        } catch(err) {
            throw new Error(err);
        }
    }
}