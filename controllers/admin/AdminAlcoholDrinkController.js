const AlcoholDrink = require("../../models/AlcoholDrinkModel");

const AdminAlcoholDrinkController = {
    createAlcoholDrink: async (req, res) => {
        const drink = new AlcoholDrink(req.body);
        await drink.save();

        return res.json(drink);
    }
}

module.exports = AdminAlcoholDrinkController;
