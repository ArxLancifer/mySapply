const route = require("express").Router();

route.use(require("./userRoute"));
route.use("/products", require("./productCategories"));
route.use("/products", require("./productSubCategories"));

module.exports = route;
