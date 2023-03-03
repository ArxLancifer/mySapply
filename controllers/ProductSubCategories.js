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
    getAllProductsByType: async function (req, res) {
        const filters = req.body.filters;
        console.log(filters);
        try {
            let query;
            const paramSlug = req.params.slug;
            if (!paramSlug) {
                return res.status(400).json({message: "paramSlug not found"});
            }

            const subCategory = await ProductSubCategory
                .findOne({slug: paramSlug})
                .populate([
                    {
                        path: "category",
                        select: "modelRef subCategories",
                    }
                ]);

            if (!subCategory.category.modelRef) {
                return res.status(400).json({message: "modelRed not found"});
            }

            const dynamicModelCollection = require(`../models/${subCategory.category.modelRef}`);
            const allProducts = await dynamicModelCollection
                .find({
                    subCategory: subCategory._id,
                    price: {$gte: filters.minRange || 14, $lte: filters.maxRange || 500}
                })
                .populate(["subCategory"]);

            const prices = allProducts.map(product => product.price);
            if (!(prices.length > 1)) {
                prices.unshift(0);
            }

            return res.json({allProducts, prices, subCategory});
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ProductCategories;
