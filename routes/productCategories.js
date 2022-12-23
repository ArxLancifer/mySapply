const route = require("express").Router();
const productCategoriesController = require("../controllers/ProductCategoriesController");

route.post("/categories", productCategoriesController.createProductCategories);
route.get("/categories", productCategoriesController.getProductCategories);
route.put("/categories/:_id", productCategoriesController.updateProductCategories);
route.delete("/categories/:_id", productCategoriesController.deleteProductCategory);

module.exports = route;
