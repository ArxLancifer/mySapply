const AlcoholDrink = require("../models/AlcoholDrinkModel");
const ProductSubCategory = require("../models/ProductSubCategory");
const {sliderFilterFn} = require("../helpers/filters");

const AlcoholDrinkController = {
    getAlcoholDrinksBySubCategory: async (req, res) => {
        const subCategorySlug = req.params.slug;
        const subCategory = await ProductSubCategory.findOne({slug: subCategorySlug});
        const drinks = await AlcoholDrink.find({subCategory: subCategory._id});

        if (!drinks.length) {
            return res.json([]);
        }
        const countOfDrinks = drinks.length;
        return res.json({drinks, countOfDrinks});
    },
    // TODO
    // building a query in order to fetch right documents, depending on what the user will send
    getAlcoholDrinksByFilters: async (req, res) => {
        const sliderFilter = req.body.filters.slider;
        const brandFilter = req.body.filters.brand;
        let sliderFilterObj = {};
        let brandFilterObj = {};

        if (sliderFilter) {
            // checking min and max price
            sliderFilterObj = sliderFilterFn(sliderFilter);
        }

        if (brandFilter) {
            brandFilterObj = {
                slug: brandFilter
            };
        }

        const query = {
            ...sliderFilterObj,
            ...brandFilterObj
        }

        const drinks = await AlcoholDrink.find(query ? query : {});
        if (!drinks.length) {
            return res.json([]);
        }

        const countOfDrinks = drinks.length;

        return res.json({drinks, countOfDrinks});
    }
}

module.exports = AlcoholDrinkController;
