const {model, Schema} = require('mongoose');

const AlcoholDrinkModel = new Schema(
    {
        userCustomers: [{
            type: Schema.Types.ObjectId,
            ref: "UserCustomer"
        }],
        subCategory: {
            type: Schema.Types.ObjectId,
            ref: "ProductSubCategory"
        },
        brandName: {
            type: String
        },
        alcoholVol: {
            type: Number
        },
        weightML: {
            type: String
        },
        title: {
            type: String
        },
        price: {
            type: Number
        },
        slug: {
            type: String
        },
        collectionType:{
            type:String
        }
        
    },
    {
        timestamps: true
    }
)

module.exports = model("AlcoholDrink", AlcoholDrinkModel);
