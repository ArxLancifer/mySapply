const route = require("express").Router();
const FiltersController = require("../controllers/FiltersController");

route.get("/categories/:slug", FiltersController.fetchCategoriesForFilters);

module.exports = route;
