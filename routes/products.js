const route = require('express').Router();
const createProductController = require('../controllers/admin/createProductController');
route.post("/products", createProductController.createProduct);


module.exports = route;