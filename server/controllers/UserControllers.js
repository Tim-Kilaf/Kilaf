const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {Users, Roles} = require('../models')

class UserController {
    static login(req,res){
        console.log(req.body)
        Users.findOne({
            include: [Roles],
            where:{
                email: req.body.email
            }
        })
        .then(user=>{
            // console.log(user)
            let valid = checkPassword(req.body.password, user.password)
            // console.log(valid)
            if(valid){
                let access_token = generateToken(user)
                let role = user.Role.name
                res.status(200).json({access_token, role})
            } else{ 
                res.status(400).json({message: 'Invalid Username or Password'})
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({message: 'Invalid Username or Password'})
        })
    }
    static register(req,res){
        console.log('masuk 1')
        Users.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            RoleId: '',
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(user => {
            console.log(user)
            return Users.findOne({include: [Roles],where:{email: user.email}})
        })
        .then(user => {
            let role = user.Role.name
            return res.status(201).json({id:user.id, email:user.email, role})
        })
        .catch(err=>{
            console.log(err.name)
            if(err.name === 'SequelizeValidationError'){
                let error = err.errors[0].message
                return res.status(400).json({message: error})
            } else if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({message: 'Email has already exist'})
            } else {
                return res.status(500).json({message: 'Internal Server Error'})
            }
        })
    }
}

module.exports = UserController