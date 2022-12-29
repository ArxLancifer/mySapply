const route = require("express").Router();
const AdminAlcoholDrinkController = require("../../controllers/admin/AdminAlcoholDrinkController");

route.post("/alcohol-drinks", AdminAlcoholDrinkController.createAlcoholDrink);

route.get("/alcohol-drinks", AdminAlcoholDrinkController.getAlcoholDrinks);
route.get("/alcohol-drinks/:_id", AdminAlcoholDrinkController.createAlcoholDrink);

route.put("/alcohol-drinks/:_id", AdminAlcoholDrinkController.getAlcoholDrink);


module.exports = route;
