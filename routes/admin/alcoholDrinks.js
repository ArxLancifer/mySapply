const route = require("express").Router();
const AdminAlcoholDrinkController = require("../../controllers/admin/AdminAlcoholDrinkController");

route.post("/alcohol-drinks", AdminAlcoholDrinkController.createAlcoholDrink);

module.exports = route;
