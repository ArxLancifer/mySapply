const ProductCategory = require("../../models/ProductsCategory");
const ProductSubCategory = require("../../models/ProductSubCategory");

const adminProductCategoriesController = {
    createProductCategories: async (req, res) => {
        const categories = new ProductCategory(req.body);

        await categories.save();

        res.json(categories);
    },
    getProductCategories: async (req, res) => {
        const categories = await ProductCategory
            .find({})
            .populate("subCategories");
        res.json(categories);
    },
    updateProductCategories: async (req, res) => {
        const paramId = req.params._id;
        const category = await ProductCategory.findById(paramId);
        let subCategories;

        if (req.body.subCategories) {
            subCategories = category.subCategories.concat(req.body.subCategories);
        } else {
            subCategories = category.subCategories;
        }

        const dataToUpdate = {
            title: req.body.title && req.body.title,
            slug: req.body.slug && req.body.slug,
            subCategories: subCategories,
            modelRef: req.body.modelRef && req.body.modelRef,
        }

        const update = await ProductCategory.updateOne({_id: paramId}, dataToUpdate);
        res.json(update);
    },
    deleteProductCategory: async (req, res) => {
        const paramId = req.params._id;
        const response = await ProductSubCategory.deleteOne({_id: paramId});

        return res.json(response);
    },
};

module.exports = adminProductCategoriesController;
