module.exports = (io) => {
    const itemEndPoints = require('express').Router()
    const ItemController = require('../../controllers/ItemController')(io)
const authenticate = require('../../middleware/authentication')

    return itemEndPoints
    .get('/', authenticate, ItemController.listItem)
    .get('/:id', authenticate, ItemController.detailItem)
    .post('/create', authenticate ,ItemController.createItem)    
}
// module.exports = itemEndPoints