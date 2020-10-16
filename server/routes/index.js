const route = require('express').Router()
const UserController = require('../controllers/UserControllers')

route.get('/', (req, res) => {
    res.send('Hello World!')
})
route.post('/login', UserController.login)

module.exports = route