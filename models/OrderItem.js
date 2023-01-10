const {model, Schema} = require("mongoose");

const OrderItemSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order"
        },
        productEntity: {
            type: String,
            enum: ["AlcoholDrink"],
            index: true
        },
        productForOrderEntity: {
            type: Schema.Types.ObjectId,
            refPath: "productEntity",
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("OrderItem", OrderItemSchema);
