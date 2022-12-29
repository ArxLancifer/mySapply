const route = require("express").Router();
const ProductSubCategories = require("../controllers/ProductSubCategories");

route.get("/sub-categories/:slug", ProductSubCategories.getProductSubCategoryBySlug);

module.exports = route;
