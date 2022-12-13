const ProductsCategory = require("../models/ProductsCategory");

const productCategoriesController = {
    createProductCategories: async (req, res) => {
        const categories = new ProductsCategory(req.body);

        await categories.save();

        res.json(categories);
    }
};

module.exports = productCategoriesController;