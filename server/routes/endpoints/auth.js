module.exports = () => {
    const authEndpoints = require('express').Router()
    const UserController = require('../../controllers/UserControllers')

    return authEndpoints
        .post('/login', UserController.login)
        .post('/register', UserController.register)
}