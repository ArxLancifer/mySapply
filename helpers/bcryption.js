const bcrypt = require('bcryptjs');

module.exports = {
    bcryptHash: async function(password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    bcryptCompare: async function(reqPassword,userPassword){
        const proceedLogIn = await bcrypt.compareSync(reqPassword, userPassword)
        return proceedLogIn;
    }
}