const {Scehme, model, Schema} = require('mongoose')

const AlchoholDrinkModel = new Schema({
    supplierHas:[{
        type: Schema.Types.ObjectId,
        ref: "UserCustomer"
    }],
    subCategory:{type:String, required:true},
    brandName:{type:String, required:true},
    alcoholVol:{type:Number, default:"not available"},
    weightML:{type:String, required:true},
    price:{type:String, required:true}
},
{
    timestamps: true
}
)

module.exports = model("Product", AlchoholDrinkModel)