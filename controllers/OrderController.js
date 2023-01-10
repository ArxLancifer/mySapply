const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
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
            if (!req.user) {
                return res.json({message: "user not found"})
            }

            const totalAmounts = req.body.map(cart => {
                return cart.price * cart.quantity;
            });
            const totalAmountOrder = totalAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            const order = new Order({
                user: req.user.id,
                totalAmount: totalAmountOrder
            });
            await order.save();

            const orderItemMap = req.body.map(orderItem => {
                return {
                    order: order._id,
                    productEntity: orderItem.productEntity,
                    quantity: orderItem.quantity,
                    price: orderItem.price
                }
            });
            await OrderItem.insertMany(orderItemMap);

            return res.json({order});
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
