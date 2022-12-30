const AlcoholDrink = require("../models/AlcoholDrinkModel");
const ProductSubCategory = require("../models/ProductSubCategory");

const AlcoholDrinkController = {
    getAlcoholDrinksBySubCategory: async (req, res) => {
        const subCategorySlug = req.params.slug;
        const subCategory = await ProductSubCategory.findOne({slug: subCategorySlug});
        const drinks = await AlcoholDrink.find({subCategory: subCategory._id});

        if (!drinks.length) {
            return res.json([]);
        }
        const countOfDrinks = drinks.length
        return res.json({drinks, countOfDrinks});
    }
}

module.exports = AlcoholDrinkController;
