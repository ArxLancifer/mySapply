const ProductCategory = require("../models/ProductsCategory");

const ProductCategories = {
    getProductCategoryBySlug: async (req, res) => {
        const slug = req.params.slug;
        const productCategory = await ProductCategory
            .findOne({slug})
            .populate([
                {
                    path: "subCategories"
                }
            ]);

        return res.json(productCategory);
    },
    getProductCategories: async (req, res) => {
        const productCategories = await ProductCategory
            .find({})
            .select("title slug imageUrl")

        return res.json(productCategories);
    },
}

module.exports = ProductCategories;
