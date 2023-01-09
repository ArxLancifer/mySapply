const route = require("express").Router();
const AuthMiddleware = require("../middlewares/authMiddleware");
const OrderController = require("../controllers/OrderController");

// Test order route just for dev purpose
route.post("/order", OrderController.createOrder);

route.post("/userorders", AuthMiddleware.checkAuthUser, OrderController.getUsersOrders);

//---------------Test----------------------------

module.exports = route;
