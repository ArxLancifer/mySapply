const route = require("express").Router();
const adminProductSubCategoriesController = require("../../controllers/admin/AdminProductSubCategoriesController");

route.post("/sub-categories", adminProductSubCategoriesController.createProductSubCategory);
route.post("/many-sub-categories", adminProductSubCategoriesController.createManyProductSubCategories);

route.get("/sub-categories", adminProductSubCategoriesController.getProductSubCategories);
route.get("/sub-categories/:_id", adminProductSubCategoriesController.getProductSubCategory);

route.put("/sub-categories/:_id", adminProductSubCategoriesController.updateProductSubCategory);

route.delete("/sub-categories/:_id", adminProductSubCategoriesController.deleteProductSubCategory);
// route.delete("/delete-product-sub-categories", ProductSubCategoriesController.deleteManyProductSubCategories);

module.exports = route;
