const router = require('express').Router();
const userController = require('../controllers/createUserController');

router.post("/signup", userController.signUp);
router.get("/login", userController.logIn);

module.exports = router;
