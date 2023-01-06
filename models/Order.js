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
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Order", OrderSchema);
