const TransactionController = require('../../controllers/TransactionControllers')

const transactionEndpoints = require('express').Router()


transactionEndpoints
    .get('/', TransactionController.read)
    .get('/:UserId', TransactionController.getUserTransactions)
    .post('/create', TransactionController.create)
    .delete('/:id', TransactionController.delete)
    .put('/paid/:id', TransactionController.paid)


module.exports = transactionEndpoints