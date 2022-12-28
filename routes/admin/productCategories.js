const route = require("express").Router();
const AdminProductCategoriesController = require("../../controllers/admin/AdminProductCategoriesController");

route.post("/categories", AdminProductCategoriesController.createProductCategories);
route.get("/categories", AdminProductCategoriesController.getProductCategories);
route.put("/categories/:_id", AdminProductCategoriesController.updateProductCategories);
route.delete("/categories/:_id", AdminProductCategoriesController.deleteProductCategory);

module.exports = route;
