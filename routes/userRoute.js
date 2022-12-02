const router = require("express").Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const userAuthMid = require("../middlewares/authMiddleware");
router.post("/signup", userController.signUp);

router.post("/login", userAuthMid.isAuthenticated);

router.delete("/logout", userController.logoutUser);
router.get("/dashboard", userAuthMid.checkAuthUser, (req, res) => {
  res.send("<h1>test authenticate</h1>");
});

module.exports = router;
