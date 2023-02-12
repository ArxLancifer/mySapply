const AlcoholDrinkModel = require("../models/AlcoholDrinkModel");
const ProductCategory = require("../models/ProductsCategory");
const ProductSubCategory = require("../models/ProductSubCategory");

const FiltersController = {
    fetchCategoriesForFilters: async (req, res) => {
        try {
            const category = await ProductCategory
                .findOne({slug: req.params.slug})
                .populate([
                    {
                        path: "subCategories",
                        select: "title slug",
                    }
                ]);

            return res.json(category);
        } catch (e) {
            console.error(e);
        }
    },
    fetchFilteredProducts: async (req, res) => {
        try {
            const filters = req.body.productsToSearch;
            const slug = req.body.slug;

            const filteredCategories = await ProductSubCategory
                .find({slug: filters.length === 0 ? slug : filters})
                .select("slug category")
                .populate([
                    {
                        path: "category",
                        select: "modelRef slug"
                    }
                ]);
            const dynamicModel = require("../models/" + filteredCategories[0].category.modelRef);

            const subCategoriesIds = filteredCategories.map(option => option._id);
            const filteredItems = await dynamicModel.find({subCategory: subCategoriesIds});

            return res.json({filteredItems});
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = FiltersController;
