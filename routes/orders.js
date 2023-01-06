const OrderModel = require("../models/Order");
const route = require("express").Router();
const AuthMiddleware = require("../middlewares/authMiddleware");

// Test order route just for dev purpose
route.post("/order", AuthMiddleware.checkAuthUser, async (req,res)=>{
    try {
        const myOrder = await OrderModel({title:req.body.title, totalAmount:req.body.amount, user:req.body.user})
        await myOrder.save();
        res.send("Order done")
    } catch (error) {
        console.log(error);
    }
})

route.post("/userorders", AuthMiddleware.checkAuthUser, async (req, res)=>{
    try {
        const userId = req.body.user;
        if (!userId) {
            return res.json({message: "user not found"});
        }

        const myOrder = await OrderModel.find({user: userId});
        res.json(myOrder);
    } catch (error) {
        console.log(error);
    }
})

//---------------Test----------------------------

module.exports = route;
