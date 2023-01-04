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
            res.redirect('/');
            // res.json("User logged out")
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
    }
}


module.exports = userController;
