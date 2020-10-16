const itemEndPoints = require('express').Router()
const ItemController = require('../../controllers/ItemController')

itemEndPoints
    .post('/create', ItemController.createItem)    

module.exports = itemEndPoints