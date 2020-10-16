const bcrypt = require('bcryptjs')

function hashPassword(password){
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    console.log(password, ' dari bcrypt')
    return hash
}

function checkPassword(password,hash){
    let checked = bcrypt.compareSync(password, hash);
    return checked
}

module.exports = {hashPassword, checkPassword}