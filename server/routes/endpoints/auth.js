module.exports = (io) => {
    const authEndpoints = require('express').Router()
    const UserController = require('../../controllers/UserControllers')(io)

    return authEndpoints
        .post('/login', UserController.login)
        .post('/register', UserController.register)
}