const router = require('express').Router();
const userController = require('../controllers/createUserController');
const passport = require('passport')

router.post("/signup", userController.signUp);
// router.post("/login", userController.logIn);
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.json({success: true});
    });

module.exports = router;
