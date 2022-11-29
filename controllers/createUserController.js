const UserCustomerModel = require('../models/UserCustomerModel');
const validator = require('validator');
const bcrypt = require('../helpers/bcryption');
const { bcryptHash } = require('../helpers/bcryption');
const passport = require('passport')
const proceedLogin = require('../config/passport');

const userController = {
    signUp: async function (req, res) {
        try {
            const { email, username, password } = req.body;
            // if (!validator.isEmail(email) 
            //      || !validator.isLength(username, { min: 5, max: 15 }
            //      || !validator.isLength(password, { min: 5, max: 15 }))) {
            //     return res.json("Invalid email, or username or password")
                
            // }
            const userExists = await UserCustomerModel.count({ email });
            if(userExists) {
              return res.json("User already exists")
                
            }
            // Create user
            const hashedPassword = await bcrypt.bcryptHash(password)
            const user = new UserCustomerModel({
                username,
                email,
                password:hashedPassword
            })
            
            await user.save()
            console.log(`Created user :${user}`)
            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },
    logIn: function (req, res, next) {
        try {
            // console.log("Log in", req.body)
            // passport.authenticate('local', {
            //     successMessage:res.send("success"),
            //     failureMessage:res.send("failled"),
            // })

            // passport.authenticate('local', {
            //     successMessage:"You are Logged in",
            //     failureMessage:res.send("You have provided invalid email or password")
            // }, () => {
            //     res.json({success: true})
            // })(req, res, next);
            // passport.authenticate('local', {
            //         failureMessage:res.send("You have provided invalid email or password"),
            //         successMessage:"You are Logged in"
            //     })
            //     function(req, res) {
            //         res.json({success: true});
            //     };
        } catch (error) {
            console.log(error)
        }
    },

}

module.exports = userController;
