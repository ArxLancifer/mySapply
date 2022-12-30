const route = require("express").Router();

route.use(require("./userRoute"));
route.use("/admin/products", require("./admin/productCategories"));
route.use("/admin/products", require("./admin/productSubCategories"));
route.use("/admin/products", require("./admin/alcoholDrinks"));

route.use("/products", require("./productCategories"));
route.use("/products", require("./productSubCategories"));
route.use("/products", require("./alcoholDrinks"));

module.exports = route;
