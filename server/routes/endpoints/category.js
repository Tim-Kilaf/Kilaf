module.exports = (io) => {
    const categoryEndPoints = require('express').Router()
    const CategoryController = require('../../controllers/CategoryController')(io)
    const authenticate = require('../../middleware/authentication')

    return categoryEndPoints
    .get('/', authenticate, CategoryController.listCategories)
        .get('/:categoryId', authenticate, CategoryController.getItemByCategory)
}