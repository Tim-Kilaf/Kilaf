const TransactionController = require('../../controllers/TransactionControllers')

const transactionEndpoints = require('express').Router()


transactionEndpoints
    .get('/', TransactionController.read)
    .post('/create', TransactionController.create)
    .delete('/:id', TransactionController.delete)


module.exports = transactionEndpoints