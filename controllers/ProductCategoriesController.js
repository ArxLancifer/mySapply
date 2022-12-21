const ProductCategory = require("../models/ProductsCategory");

const productCategoriesController = {
    createProductCategories: async (req, res) => {
        const categories = new ProductCategory(req.body);

        await categories.save();

        res.json(categories);
    },
    getProductCategories: async (req, res) => {
        const categories = await ProductCategory.find({});
        res.json(categories);
    },
    updateProductCategories: async (req, res) => {
        const paramId = req.params._id;
        const category = await ProductCategory.findById(paramId);
        let title;
        let products;

        if (req.body.title) {
            title = req.body.title;
        }

        if (req.body.products) {
            products = category.products.concat(req.body.products);
        } else {
            products = category.products;
        }
        
        const dataToUpdate = {
            title: title,
            products: products,
        }

        const update = await ProductCategory.updateOne({_id: paramId}, dataToUpdate);
        res.json(update);
    }
};

module.exports = productCategoriesController;