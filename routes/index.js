const route = require("express").Router();

route.use(require("./userRoute"));
route.use("/admin/products", require("./admin/productCategories"));
route.use("/admin/products", require("./admin/productSubCategories"));

module.exports = route;
