const ProductSubCategory = require("../models/ProductSubCategory");
const ProductCategory = require("../models/ProductsCategory");

const productSubCategoriesController = {
    createProductSubCategory: async (req, res) => {
        const subCategory = new ProductSubCategory(req.body);
        await subCategory.save();

        const category = await ProductCategory.findById(subCategory.category);
        if (!Array.isArray(category.subCategories)) {
            category.subCategories = [];
        }

        if (!category.subCategories.length) {
            category.subCategories = subCategory._id;
        } else {
            category.subCategories.push(subCategory._id);
        }

        await category.save();

        return res.json({subCategory, subCategories: category.subCategories});
    },
    createManyProductSubCategories: async (req, res) => {
        const subCategories = await ProductSubCategory.insertMany(req.body);
        const category = await ProductCategory.findById(subCategories[0].category);

        if (!Array.isArray(category.subCategories)) {
            category.subCategories = [];
        }

        let addDataToSubCategories = [];
        const subCategoriesIds = subCategories.map(sc => sc._id);
        if (!category.subCategories.length) {
            category.subCategories = subCategoriesIds;
        } else {
            addDataToSubCategories = category.subCategories.concat(subCategoriesIds);
            category.subCategories = addDataToSubCategories;
        }

        await category.save();
        return res.json({category, subCategories});
    },
    getProductSubCategories: async (req, res) => {
        const categories = await ProductSubCategory.find({}).populate("category");
        res.json(categories);
    },
    getProductSubCategory: async (req, res) => {
        const paramId = req.params._id;
        const subCategory = await ProductSubCategory.findById(paramId);
        return res.json(subCategory);
    },
    updateProductSubCategory: async (req, res) => {
        const paramId = req.params._id;
        const dataToUpdate = {
            title: req.body.title && req.body.title,
            slug: req.body.slug && req.body.slug
        }

        const update = await ProductSubCategory.updateOne({_id: paramId}, dataToUpdate);
        return res.json(update);
    },
    deleteProductSubCategory: async (req, res) => {
        const paramId = req.params._id;
        await ProductCategory.updateOne({subCategories: paramId}, {$pull: {subCategories: paramId}});
        await ProductSubCategory.deleteOne({_id: paramId});
        const categories = await ProductSubCategory.find({}).populate("category");
        res.json(categories);
    },
    // deleteManyProductSubCategories: async (req, res) => {
    //     const categories = await ProductCategory.find({});
    //     const updatedCategories = await ProductCategory.updateMany({}, {});
    //     // const deleteSubCategories = await ProductSubCategory.deleteMany({});
    //
    //     return res.json(updatedCategories);
    // }
};

module.exports = productSubCategoriesController;
