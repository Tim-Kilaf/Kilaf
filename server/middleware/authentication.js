const { verifyToken } = require('../helpers/jwt')
const { Users } = require('../models')

const authenticate = (req, res, next) => {
    try {
        const { access_token } = req.headers
        const payload = verifyToken(access_token)
        const user = await Users.findOne({ where: { id: payload.id } })
        if (user) {
            req.user = user
            return next()
        } else throw new Error({ code: 401, message: "Unauthenticated user." })
    } catch (err) {
        return next(err)
    }
}

module.exports = authenticate