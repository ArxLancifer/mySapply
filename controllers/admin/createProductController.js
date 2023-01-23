// const AlcoholDrinkModel = require('../../models/AlcoholDrinkModel');

// const AlcoholDrinkModel = require("../../models/AlcoholDrinkModel");
const AlcoholDrinkModel = "AlcoholDrinkModel";


module.exports = {
    createProduct: async function(req, res){
        const collectionType = AlcoholDrinkModel.collection.collectionName;

        // const createdProduct = new AlcoholDrinkModel({...req.body, collectionType});
        const createdProduct = new require(`../../models/${AlcoholDrinkModel}`)({...req.body, collectionType});
        await createdProduct.save();
        res.json(createdProduct);
    },
    getAllProductsByType: async function(req, res){
        const allProducts = await AlcoholDrinkModel.find({colectionType:req.body.collectionType}).lean();

    }
}