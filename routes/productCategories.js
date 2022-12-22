const route = require("express").Router();
const productCategoriesController = require("../controllers/ProductCategoriesController");

route.post("/create-product-category", productCategoriesController.createProductCategories);
route.get("/get-product-categories", productCategoriesController.getProductCategories);
route.put("/update-product-categories/:_id", productCategoriesController.updateProductCategories);
route.delete("/delete-product-category/:_id", productCategoriesController.deleteProductCategory);

module.exports = route;
