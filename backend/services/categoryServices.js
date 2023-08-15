const CategoryModel = require("../models/category");
const CategoryModelInstance = new CategoryModel();
const SubcategoryModel = require("../models/subcategory");
const SubcategoryModelInstance = new SubcategoryModel();

module.exports = class ProductService {

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
}