const route = require("express").Router();
const productCategoriesController = require("../controllers/ProductCategoriesController");

route.post("/create-product-category", productCategoriesController.createProductCategories);

module.exports = route;