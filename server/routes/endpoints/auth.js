const authEndpoints = require('express').Router()
const UserController = require('../controllers/UserControllers')

authEndpoints
    .post('/login', UserController.login)
    .post('/register', UserController.register)

module.exports = authEndpoints