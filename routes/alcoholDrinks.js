const route = require("express").Router();
const AlcoholDrinkController = require("../controllers/AlcoholDrinkController");

route.get("/:slug/alcohol-drinks", AlcoholDrinkController.getAlcoholDrinksBySubCategory);

module.exports = route;
