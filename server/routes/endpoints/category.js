module.exports = (io) => {
    const categoryEndPoints = require('express').Router()
    const CategoryController = require('../../controllers/CategoryController')(io)
    const authenticate = require('../../middleware/authentication')

    return categoryEndPoints
    .get('/', CategoryController.listCategories)
    .get('/:categoryId', authenticate, CategoryController.getItemByCategory)
    // .post('/create', authenticate ,ItemController.createItem)    
}