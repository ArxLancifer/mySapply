const Order = require("../models/Order");
const UserCustomer = require("../models/UserCustomerModel");
const route = require("express").Router();
const AuthMiddleware = require("../middlewares/authMiddleware");

// Test order route just for dev purpose
route.post("/order", async (req,res)=>{
    try {
        const myOrder = new Order(req.body);
        await myOrder.save();
        await UserCustomer.updateOne({_id: myOrder.user}, {$push: {orders: myOrder._id}});

        return res.json({success: true});
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

        const myOrder = await Order.find({user: userId});
        res.json(myOrder);
    } catch (error) {
        console.log(error);
    }
})

//---------------Test----------------------------

module.exports = route;
