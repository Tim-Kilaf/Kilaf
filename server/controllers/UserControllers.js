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
            }else{
                res.status(400).json({message: 'Invalid Username or Password'})
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({message: 'Invalid Username or Password 1'})
        })
    }
}

module.exports = UserController