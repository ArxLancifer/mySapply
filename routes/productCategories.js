const route = require("express").Router();
const productCategoriesController = require("../controllers/ProductCategoriesController");

route.post("/create-product-category", productCategoriesController.createProductCategories);
route.get("/get-product-categories", productCategoriesController.getProductCategories);

module.exports = route;