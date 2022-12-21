const {model, Schema} = require('mongoose');

const schema = new Schema(
    {
        title: {
            type: String
        },
        products: {
            type: [String]
        },
        imageUrl: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = model("ProductCategory", schema);
