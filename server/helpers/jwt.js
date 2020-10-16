const jwt = require('jsonwebtoken')
secret = process.env.SECRET
// secret = 'kopiliong'

function generateToken(user){
    let token = jwt.sign({id:user.id,email:user.email}, secret);
    return token
}

function verifyToken(token){
    let decoded = jwt.verify(token, secret)
    return decoded
}

module.exports = {generateToken, verifyToken}