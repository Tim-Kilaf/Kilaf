const { verifyToken } = require('../helpers/jwt')
const { Users } = require('../models')

const authenticate = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const payload = verifyToken(access_token)
        const user = await Users.findOne({ where: { id: payload.id } })
        if (user) {
            req.user = user
            return next()
        }
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = authenticate