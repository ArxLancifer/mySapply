const Order = require("../models/Order");
const UserCustomer = require("../models/UserCustomerModel");

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const myOrder = new Order(req.body);
            await myOrder.save();
            await UserCustomer.updateOne({_id: myOrder.user}, {$push: {orders: myOrder._id}});

            return res.json({success: true});
        } catch (error) {
            console.log(error);
        }
    },
    createCartOrder: async (req, res) => {
        try {
            const totalAmounts = req.body.map(cart => {
                return {
                    total: cart.price * cart.quantity
                }
            });
            res.json(totalAmounts);
        } catch (error) {
            console.log(error);
        }
    },
    getUsersOrders: async (req, res) => {
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
    }
};

module.exports = OrderController
