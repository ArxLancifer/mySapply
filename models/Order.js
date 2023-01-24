const {model, Schema} = require('mongoose');

const OrderSchema = new Schema(
    {
        title: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "UserCustomer"
        },
        totalAmount: {
            type: Number
        },
        status: {
            type: String,
            enum: ["Pending", "Delivered", "Canceled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Order", OrderSchema);
