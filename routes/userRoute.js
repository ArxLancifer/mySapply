const router = require("express").Router();
const userController = require("../controllers/userController");
const userAuthMid = require("../middlewares/authMiddleware");
const OrderModel = require("../models/Order"); // delete this after.

router.post("/signup", userController.signUp);

router.post("/login", userAuthMid.authorize);

router.delete("/logout", userController.logoutUser);

router.get("/dashboard", userAuthMid.checkAuthUser, (req, res) => {
    res.send("<h1>user is authenticated</h1>");
});

router.put("/profile/settings", userController.UpdateUserFromSettings);
router.put("/profile/profile", userController.UserOrders);

// Test order route just for dev purpose
router.post("/order", async (req,res)=>{
    try {
        const myOrder = await OrderModel({title:req.body.title, totalAmount:req.body.amount})
        await myOrder.save();
        res.send("Order done")
    } catch (error) {
        console.log(error);
    }
})

router.get("/order", async (req, res)=>{
    try {
        const myOrder = await OrderModel.find({});
        res.json(myOrder);
    } catch (error) {
        console.log(error)
    }
})

//---------------Test----------------------------

module.exports = router;
