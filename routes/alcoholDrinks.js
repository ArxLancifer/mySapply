const route = require("express").Router();
const AlcoholDrinkController = require("../controllers/AlcoholDrinkController");

route.get("/:slug/alcohol-drinks", AlcoholDrinkController.getAlcoholDrinksBySubCategory);
route.get("/:slug", AlcoholDrinkController.getProductBySlug);

route.post("/:slug/alcohol-drinks", AlcoholDrinkController.getAlcoholDrinksByFilters);
route.post("/search", AlcoholDrinkController.getProductBySearchValue);

module.exports = route;
