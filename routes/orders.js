const route = require("express").Router();
const AuthMiddleware = require("../middlewares/authMiddleware");
const OrderController = require("../controllers/OrderController");

// Test order route just for dev purpose
route.post("/order", OrderController.createOrder);

route.post("/cart/order", OrderController.createCartOrder);

route.post("/userorders", AuthMiddleware.checkAuthUser, OrderController.getUsersOrders);

route.get("/my-orders/:_id", AuthMiddleware.checkAuthUser, OrderController.getOrderItems);

//---------------Test----------------------------

module.exports = route;
