const { verifyToken } = require('../helpers/jwt')
const { Users } = require('../models')

const authorize = (req, res, next) => {
    try {
        const { id } = req.params
        const RoleId = req.user.id
        const role = await role.findOne({ where: { RoleId } })

        if (role.name === "admin" || req.user.id == id) {
            return next()
        } else throw new Error({ code: 401, message: "Unauthorized user." })
    } catch (err) {
        return next(err)
    }
}

module.exports = authorize