const router = require("express").Router();
const userController = require("../controllers/userController");
const userAuthMid = require("../middlewares/authMiddleware");

router.post("/signup", userController.signUp);

router.post("/login", userAuthMid.authorize);

router.delete("/logout", userController.logoutUser);

router.get("/dashboard", userAuthMid.checkAuthUser, (req, res) => {
    res.send("<h1>user is authenticated</h1>");
});

module.exports = router;
