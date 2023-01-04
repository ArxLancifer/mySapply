const {model, Schema} = require('mongoose');

const OrderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "UserCustomer"
        },
        totalAmount: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Order", OrderSchema);
