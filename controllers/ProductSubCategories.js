const ProductSubCategory = require("../models/ProductSubCategory");

const ProductCategories = {
    getProductSubCategoryBySlug: async (req, res) => {
        const slug = req.params.slug;
        const productSubCategory = await ProductSubCategory
            .findOne({slug})
            .populate([
                {
                    path: "category"
                }
            ]);

        return res.json(productSubCategory);
    },
}

module.exports = ProductCategories;
