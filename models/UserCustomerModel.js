
const { Schema, model } = require("mongoose");
const UserCustomerModel = new Schema(
    {
        accountType: {type:String, required:true},
        name:{type:String, required:true},
        email:{type:String, required:true},
        userName:{type:String, require:true},
        password:{type:String, require:true},
        vatNumber:{type:String, require:true},
        phone:{type:Number, require:true},
        address:{type:String, require:true},
        postalCode:{type:String, require:true},
        confirmedUsers:[{
            type: Schema.Types.ObjectId,
            ref: "confirmedUser"
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model("UserCustomer", UserCustomerModel)