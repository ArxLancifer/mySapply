const ProductsCategory = require("../../models/ProductsCategory");

module.exports = {
    createProduct: async function(req, res){
        const category = await ProductsCategory.findById(req.body.category).select("modelRef");
         
        const dynamicModelCollection = require(`../../models/${category.modelRef}`)
        const collectionType = dynamicModelCollection.collection.collectionName;

        
        const dataToCreate = {};
        for(key in req.body){
            if(key !=='category'){
                dataToCreate[key] = req.body[key]
            }
        }
        const createdProduct = new dynamicModelCollection({...dataToCreate, collectionType});
        // await createdProduct.save();
        res.json(createdProduct);
        
    },
    getAllProductsByType: async function(req, res){
        // const dynamicModelCollection = require(`../../models/${req.body.modelRef}`);
        // const allProducts = await dynamicModelCollection.find({}).lean();

        res.json([]);
    }
}