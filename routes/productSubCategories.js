const route = require("express").Router();
const ProductSubCategories = require("../controllers/ProductSubCategories");

route.get("/sub-categories/:slug", ProductSubCategories.getProductSubCategoryBySlug);
route.post("/:category/:slug", ProductSubCategories.getAllProductsByType);

module.exports = route;
