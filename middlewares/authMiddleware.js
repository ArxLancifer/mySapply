const passport = require('passport')


function isAuthenticated(req, res, next){
    passport.authenticate("local", (err, user,info)=>{
        if(err){
           return res.json(err)
        }
        if(!user){
            res.send("No user")
        }
        
        else{
            req.logIn(user, err=>{
                if(err) throw err;
                res.send(req.user)
                 console.log(req)
                
            })
        }
    })(req, res, next)
}

function checkAuthUser(req, res, next) {
        if (req.isAuthenticated()) {
          return next()
        } else {
          res.json("User is not authenticated")
        }
}

module.exports = {isAuthenticated, checkAuthUser};