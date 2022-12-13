const Product = require("../models/AlcoholDrinkModel");

const DrinkController = {
    createDrink: async (req, res) => {
        const product = new Product(req.body);
        await product;

        res.json({message: "product created"});
    },
    updateDrink: async (req, res) => {
        await Product.updateOne({_id: req.params._id}, req.body);

        res.json({message: "product updated"});
    },
    deleteDrink: async (req, res) => {
        await Product.deleteOne({_id: req.params._id});

        res.json({message: "product deleted"});
    },
    fetchDrink: async (req, res) => {
        const product = Product.findById(req.params._id);

        if (!product) {
            res.json({message: "product not found"});
        }
        res.json(product);
    }
}

module.exports = DrinkController;
