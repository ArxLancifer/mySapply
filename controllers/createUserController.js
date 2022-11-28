const userModel = require('../models/UserCustomerModel');

const userController = {
    signUp: async function(req, res){
        try {
            const { email, username, password } = req.body;
            const userExists = await userModel.count({ email });
        } catch (error) {
            console.log(error)
        }
    },
    logIn: function(req, res){
        try {
            console.log("Log in",req.body)
        } catch (error) {
            console.log(error)
        }
    },
    
}

module.exports = userController;
