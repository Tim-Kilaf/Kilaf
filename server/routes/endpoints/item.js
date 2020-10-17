const itemEndPoints = require('express').Router()
const ItemController = require('../../controllers/ItemController')
const authenticate = require('../../middleware/authentication')

itemEndPoints
    .get('/', authenticate, ItemController.listItem)
    .get('/:id', authenticate, ItemController.detailItem)
    .post('/create', authenticate ,ItemController.createItem)    

module.exports = itemEndPoints