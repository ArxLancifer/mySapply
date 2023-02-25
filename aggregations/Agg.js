const AlcoholDrink = require("../models/AlcoholDrinkModel");
const ProductSubCategory = require("../models/ProductSubCategory");
const ProductCategory = require("../models/ProductsCategory");
const {ObjectId} = require('mongodb');

const Agg = {
    aggregate: async (req, res) => {
        console.time("start");

        /** approach 1 */
        // const aggregation = [
        //     {
        //         $match: {slug: 'absolute'}
        //     },
        //     {
        //         $project: {
        //             slug: "$slug",
        //             subCategory: "$subCategory",
        //             brandName: "$brandName",
        //             title: "$title",
        //             price: "$price"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "productsubcategories",
        //             localField: "subCategory",
        //             foreignField: "_id",
        //             as: "sub"
        //         }
        //     },
        //     {
        //         $set: {
        //             sub: { $arrayElemAt: ["$sub", 0] }
        //         }
        //     }
        // ];
        // const agg = await AlcoholDrink.aggregate(aggregation);

        /** approach 2 */
        const aggregation = [
            {
                $match: {
                    "_id": { $eq: ObjectId("6398e885e879cfad4454da59") }
                }
            },
            {
                $lookup: {
                    from: "productsubcategories",
                    localField: "subCategories",
                    foreignField: "_id",
                    as: "subCategories"
                }
            },
            {
                $project: {
                    subCategories: {
                        $filter: {
                            input: "$subCategories",
                            as: "subCategory",
                            cond: { $eq: [ "$$subCategory.slug", "votka" ] }
                        }
                    }
                }
            },
            {
                $project: {
                    subCategory: { $arrayElemAt: ["$subCategories", 0] }
                }
            }
            // {
            //     $unwind: {
            //         path: "$subCategories",
            //     }
            // },
        ];

        const agg = await ProductCategory.aggregate(aggregation);

        // const test = await AlcoholDrink
        //     .find({})
        //     .populate("subCategory")

        console.time("end");

        return res.json(agg);
        // return res.json(test);
    },
}

module.exports = Agg;
