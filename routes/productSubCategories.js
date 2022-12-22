const route = require("express").Router();
const ProductSubCategoriesController = require("../controllers/ProductSubCategoriesController");

route.post("/create-product-sub-category", ProductSubCategoriesController.createProductSubCategory);
route.post("/create-many-product-sub-categories", ProductSubCategoriesController.createManyProductSubCategories);

route.get("/get-product-sub-categories", ProductSubCategoriesController.getProductSubCategories);
route.get("/get-product-sub-category/:_id", ProductSubCategoriesController.getProductSubCategory);

route.put("/update-product-sub-category/:_id", ProductSubCategoriesController.updateProductSubCategory);

route.delete("/delete-product-sub-category/:_id", ProductSubCategoriesController.deleteProductSubCategory);
// route.delete("/delete-product-sub-categories", ProductSubCategoriesController.deleteManyProductSubCategories);

module.exports = route;
