const UserCustomerModel = require('../models/UserCustomerModel');
const validator = require('validator');
const bcrypt = require('../helpers/bcryption');

const userController = {
    signUp: async function (req, res) {
        try {
            const {email, username, password} = req.body;
            if (
                !validator.isEmail(email)
                || !validator.isLength(username, {min: 5, max: 15}
                    || !validator.isLength(password, {min: 5, max: 15}))
            ) {
                return res.json("Invalid email, or username or password")
            }
            const userExists = await UserCustomerModel.count({email});
            if (userExists) {
                return res.json("User already exists")

            }
            // Create user
            const hashedPassword = await bcrypt.hash(password)
            const user = new UserCustomerModel({
                username,
                email,
                password: hashedPassword
            })

            await user.save()
            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },
    logoutUser: function (req, res) {
        req.logout(function (err) {
            if (err) {
                return res.json(err)
            }
            // res.redirect('/');
            res.json("User logged out")
        })
        console.log(req.user)
    },
    UpdateUserFromSettings: async (req, res) => {
        try {
            await UserCustomerModel.updateOne({_id: req.body._id}, req.body.dataToUpdate);
            const user = await UserCustomerModel.findById(req.body._id);
            return res.json(user);
        } catch (e) {
            console.log(e);
        }
    },
    UserOrders: async (req, res) => {
        try {
            res.send("<p>Paraggelies</p>")
        } catch (error) {
            console.log(error)
        }
    },
    AddRemoveFavorite: async (req, res) => {
        try {
            const userId = req.body.userId;
            const product = req.body.product;

            const isFavorite = !!await UserCustomerModel.findOne({"favorites._id": product._id});

            if (!isFavorite) {
                await UserCustomerModel.updateOne({_id: userId}, {$push: {favorites: product}});
                return res.json(product._id);
            }
            await UserCustomerModel.updateOne(
                {"favorites._id": product._id},
                {
                    $pull: {
                        "favorites": {_id: product._id}
                    }
                }
            )
            return res.json("");
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = userController;
