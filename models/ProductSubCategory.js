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

// "products": [
//     {
//         "title": "Βότκα",
//         "slug": "votka"
//     },
//     {
//         "title": "Ουίσκι",
//         "slug": "oyiski"
//     },
//     {
//         "title": "Ρούμι",
//         "slug": "roumi"
//     }
// ]

module.exports = model("ProductSubCategory", productSubCategorySchema);
