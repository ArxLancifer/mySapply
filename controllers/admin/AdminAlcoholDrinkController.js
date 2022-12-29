const AlcoholDrink = require("../../models/AlcoholDrinkModel");

const AdminAlcoholDrinkController = {
    createAlcoholDrink: async (req, res) => {
        const drink = new AlcoholDrink(req.body);
        await drink.save();

        return res.json(drink);
    },
    getAlcoholDrinks: async (req, res) => {
        const drinks = AlcoholDrink.find({});
        if (!drinks.length) {
            return res.json({data: []});
        }
        return res.json(drinks);
    },
    getAlcoholDrink: async (req, res) => {
        const paramId = req.params._id;
        const drink = AlcoholDrink.findById(paramId);
        if (!drink) {
            return res.json({data: {}});
        }
        return res.json(drink);
    },
    updateAlcoholDrinks: async (req, res) => {
        const paramId = req.params._id;
        const dataToUpdate = {
            brandName: req.body.brandName && req.body.brandName
        }
        const update = await AlcoholDrink.updateOne({_id: paramId}, dataToUpdate);
        return res.json(update);
    }
}

module.exports = AdminAlcoholDrinkController;
