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
                    return done("Invalid username", false, {message: "Invalid username"})
                }

                const isMatch = await bcryption.bcryptCompare(password, user.password);
                if (!isMatch) {
                    return done("Invalid password", false, {message: "Invalid password"})
                }
                done(null, user)
            } catch (e) {
                console.log(e);
            }
            // User.findOne({username: username}).then(function(user){
            //     if(!user){
            //         return done(null, false, {message: "Invalid email"})
            //     }
            //     //Match password
            //     bcryption.bcryptCompare(password, user.password, function(err, isMatch){
            //         if(err) throw err;
            //         if(isMatch){
            //             console.log("user2", user)
            //             return done(null, user)
            //         } else{
            //             return done(null, false, {message: "Invalid password"})
            //         }
            //     })
            // })
            // .catch(error => console.log(error))
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

module.exports = proceedLogin;
