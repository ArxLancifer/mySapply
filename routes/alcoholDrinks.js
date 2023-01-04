const route = require("express").Router();
const AlcoholDrinkController = require("../controllers/AlcoholDrinkController");

route.get("/:slug/alcohol-drinks", AlcoholDrinkController.getAlcoholDrinksBySubCategory);
route.post("/:slug/alcohol-drinks", AlcoholDrinkController.getAlcoholDrinksByFilters);
route.get("/:slug", AlcoholDrinkController.getProductBySlug);

module.exports = route;
