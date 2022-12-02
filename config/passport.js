const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcryption = require('../helpers/bcryption');
const User = require('../models/UserCustomerModel');


const proceedLogin = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'username'},async function(username, password, done){
            try {
                const user = await User.findOne({username: username});
                if (!user) {
                    return done("Invalid user", false, {message: "Invalid username"})
                }

                const isMatch = await bcryption.bcryptCompare(password, user.password);
                if (!isMatch) {
                    return done("Invalid password", false, {message: "Invalid password"})
                }
                done(null, user)
            } catch (e) {
                console.log(e);
            }
        })
    );
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
          });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });
} 

module.exports = {proceedLogin};

