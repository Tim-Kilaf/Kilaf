const { verifyToken } = require('../helpers/jwt')
const { Users } = require('../models')

const authenticate = async (req, res, next) => {
    console.log('masuk atuthentic')
    try {
        const { access_token } = req.headers
        const payload = verifyToken(access_token)
        const user = await Users.findOne({ where: { id: payload.id } })
        if (user) {
            req.user = user
            return next()
        }
    } catch (err) {
        console.log(err, '====auth====')
        return next(err)
    }
}

module.exports = authenticate