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
            const userId = req.user.id;
            if (!userId) {
                return res.json({message: "user not found"})
            }

            const totalAmounts = req.body.map(cart => {
                return cart.price * cart.quantity;
            });
            const totalAmountOrder = totalAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            const order = new Order({
                user: userId,
                totalAmount: totalAmountOrder
            });
            await order.save();

            const orderItemMap = req.body.map(orderItem => {
                return {
                    order: order._id,
                    productEntity: orderItem.productEntity,
                    productForOrderEntity: orderItem.order._id,
                    quantity: orderItem.quantity,
                    price: orderItem.price
                }
            });
            const ordersItems = await OrderItem.insertMany(orderItemMap);
            const ordersItemsIds = ordersItems.map(ordersItem => ordersItem._id);
            await UserCustomer.updateOne({_id: userId}, {$push: {orders: ordersItemsIds}});

            return res.json({ordersItems});
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

            const myOrder = await UserCustomer
                .findById(userId)
                .select("orders")
                .populate([
                    {
                        path: "orders",
                        populate: [
                            {
                                path: "order productForOrderEntity"
                            }
                        ]
                    }
                ]);

            const orderMap = myOrder.orders.map(order => {
                return {
                    _id: order._id,
                    title: order.productForOrderEntity.brandName,
                    totalAmount: order.price,
                    date: order?.createdAt,
                    status: order.order.status
                }
            });
            return res.json(orderMap);
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = OrderController
