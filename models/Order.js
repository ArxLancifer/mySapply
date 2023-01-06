const {model, Schema} = require('mongoose');

const OrderSchema = new Schema(
    {
        title:String,
        user: {
            type: Schema.Types.ObjectId,
            required:true,
            ref: "UserCustomer"
        },
        totalAmount: {
            type: String
        },
        status: {
            type: String,
            enum: ["Pending", "Delivered", "Canceled"],
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Order", OrderSchema);
