const {model, Schema} = require('mongoose');

const productSubCategorySchema = new Schema(
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
        category: {
            type: Schema.Types.ObjectId,
            ref: "ProductCategory"
        }
    }
);

module.exports = model("ProductSubCategory", productSubCategorySchema);
