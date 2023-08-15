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
            // categories.subcategories = subcategories;
            // return categories
            // return {categories: categories.rows, subcategories:subcategories.rows};
            return {data};


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