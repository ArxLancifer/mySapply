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
        try {
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
            const allProducts = await dynamicModelCollection.find({subCategory:subCategory._id}).
                    populate(["subCategory"]);
            return res.json(allProducts);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ProductCategories;
