const route = require("express").Router();
const FiltersController = require("../controllers/FiltersController");

route.get("/categories/:slug", FiltersController.fetchCategoriesForFilters);
route.post("/sub-categories", FiltersController.fetchFilteredProducts);
module.exports = route;
