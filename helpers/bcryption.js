const bcrypt = require('bcryptjs');

module.exports = {
    hash: async function (password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    compare: async function (reqPassword, userPassword) {
        return await bcrypt.compareSync(reqPassword, userPassword);
    }
}
