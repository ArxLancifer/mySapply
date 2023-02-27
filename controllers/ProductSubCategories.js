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
        const filterChanged = req.body.filterChanged;
        const filters = req.body.filters;
        console.log(req.body)
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
            console.log(filters.priceRange)
            const allProducts = await dynamicModelCollection
                .find({
                    subCategory: subCategory._id,
                    price:{$gte: filters.priceRange[0], $lte: filters.priceRange[1]}
                })
                .populate(["subCategory"]);

            const prices = allProducts.map(product => product.price);
            return res.json({allProducts, prices});
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ProductCategories;
