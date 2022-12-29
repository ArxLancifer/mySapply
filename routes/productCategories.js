const route = require("express").Router();
const ProductCategories = require("../controllers/ProductCategories");

route.get("/categories/", ProductCategories.getProductCategories);
route.get("/categories/:slug", ProductCategories.getProductCategoryBySlug);

module.exports = route;
