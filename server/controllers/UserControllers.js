const SocketHandler = require('../handlers/SocketHandler')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {Users, Roles} = require('../models')

class UserController {
    constructor(io) {
        this.io = io
    }
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({
                include: [Roles],
                where: {
                    email
                }
            })
            const valid = checkPassword(password, user.password)
            if(valid){
                let access_token = generateToken(user)
                let role = user.Role.name
                return res.status(200).json({access_token, role})
            }else{ 
                return res.status(400).json({message: 'Invalid Username or Password'})
            }
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
    register = async (req, res, next) => {
        try {
            const { fullname, email, password } = req.body

            const regist = await Users.create({
                fullname,
                email,
                password,
                RoleId: ''
            })

            const newUser = await Users.findOne({include: [Roles], where: {email: regist.email} })
            let role = newUser.Role.name

            return res.status(201).json({id: newUser.id, email: newUser.email, role})

        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = (io) => new UserController(io)