const {Schema, model} = require("mongoose");
const UserCustomerModel = new Schema(
    {
        accountType: {
            type: String
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        vatNumber: {
            type: String,
        },
        phone: {
            type: Number,
        },
        address: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        confirmedUsers: [{
            type: Schema.Types.ObjectId,
            // ref: "confirmedUser"
        }],
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Order"
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model("UserCustomer", UserCustomerModel)
