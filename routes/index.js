const route = require("express").Router();

route.use(require("./userRoute"));
route.use(require("./productCategories"));
route.use(require("./productSubCategories"));

module.exports = route;
