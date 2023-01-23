const {model, Schema} = require('mongoose');

const productCategorySchema = new Schema(
    {
        title: {
            type: String
        },
        imageUrl: {
            type: String
        },
        slug: {
            type: String,
            index: true
        },
        subCategories: [{
            type: Schema.Types.ObjectId,
            ref: "ProductSubCategory"
        }],
        modelRef:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("ProductCategory", productCategorySchema);
