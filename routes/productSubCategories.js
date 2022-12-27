const route = require("express").Router();
const ProductSubCategoriesController = require("../controllers/ProductSubCategoriesController");

route.post("/sub-categories", ProductSubCategoriesController.createProductSubCategory);
route.post("/many-sub-categories", ProductSubCategoriesController.createManyProductSubCategories);

route.get("/sub-categories", ProductSubCategoriesController.getProductSubCategories);
route.get("/sub-categories/:_id", ProductSubCategoriesController.getProductSubCategory);

route.put("/sub-categories/:_id", ProductSubCategoriesController.updateProductSubCategory);

route.delete("/sub-categories/:_id", ProductSubCategoriesController.deleteProductSubCategory);
// route.delete("/delete-product-sub-categories", ProductSubCategoriesController.deleteManyProductSubCategories);

module.exports = route;
