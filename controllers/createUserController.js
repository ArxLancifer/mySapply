const userModel = require('../models/UserCustomerModel');

const userController = {
    signUp: function(req,res){
        try {
            console.log("Sign UP",req.body)
        } catch (error) {
            console.log(error)
            
        }
    },
    logIn: function(req,res){
        try {
            console.log("Log in",req.body)
            res.json("asdasd")
        } catch (error) {
            console.log(error)
        }
    },
    
}

module.exports = userController;