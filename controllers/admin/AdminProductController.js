const ProductsCategory = require("../../models/ProductsCategory");
const ProductSubCategory = require("../../models/ProductSubCategory");

module.exports = {
    createProduct: async function (req, res) {
        const category = await ProductsCategory.findById(req.body.category).select("modelRef");

        const dynamicModelCollection = require(`../../models/${category.modelRef}`);
        const collectionType = dynamicModelCollection.collection.collectionName;

        const dataToCreate = {};
        for (let key in req.body) {
            if (key !== 'category') {
                dataToCreate[key] = req.body[key];
            }
        }
        const createdProduct = new dynamicModelCollection({...dataToCreate, collectionType});
        // await createdProduct.save();
        res.json(createdProduct);

    },
    getAllProductsByType: async function (req, res) {
        try {
            const paramSlug = req.params.slug;
            if (!paramSlug) {
                return res.status(403).json({message: "paramSlug not found"});
            }

            const subCategory = await ProductSubCategory
                .findOne({slug: paramSlug})
                .populate([
                    {
                        path: "category",
                        select: "modelRef subCategories",
                        populate: [
                            {
                                path: "subCategories",
                                select: "title slug"
                            }
                        ]
                    }
                ]);

            if (!subCategory.category.modelRef) {
                return res.status(403).json({message: "modelRed not found"});
            }

            const dynamicModelCollection = require(`../../models/${subCategory.category.modelRef}`);
            const allProducts = await dynamicModelCollection.find({});

            return res.json({allProducts, subCategory});
        } catch (e) {
            console.log(e);
        }
    }
}
