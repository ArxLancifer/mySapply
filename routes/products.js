const route = require('express').Router();
const createProductController = require('../controllers/admin/AdminProductController');
route.post("/products", createProductController.createProduct);
route.get("/products", createProductController.getAllProductsByType);


module.exports = route;
