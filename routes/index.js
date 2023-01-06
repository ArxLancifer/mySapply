const route = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const UserCustomer = require("../models/UserCustomerModel");

// authProvider controller 
route.get('/', authMiddleware.checkAuthUser,  async function (req, res) {
    const validUSer = await UserCustomer.findById(req.user.id).select({password:0});
    res.json(validUSer);
});

route.use(require("./userRoute"));
route.use("/admin/products", require("./admin/productCategories"));
route.use("/admin/products", require("./admin/productSubCategories"));
route.use("/admin/products", require("./admin/alcoholDrinks"));

route.use("/products", require("./productCategories"));
route.use("/products", require("./productSubCategories"));
route.use("/products", require("./alcoholDrinks"));
route.use(require("./orders"));

module.exports = route;
