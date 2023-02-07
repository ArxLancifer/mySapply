const ProductCategory = require("../models/ProductsCategory");

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
}

module.exports = FiltersController;
