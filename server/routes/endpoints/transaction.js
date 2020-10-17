const TransactionController = require('../../controllers/TransactionControllers')

const transactionEndpoints = require('express').Router()


transactionEndpoints
    .get('/', TransactionController.read)
    .get('/:UserId', TransactionController.getUserTransactions)
    .post('/create/:ItemId', TransactionController.create)
    .delete('/:UserId', TransactionController.delete)
    .put('/paid/:UserId', TransactionController.paid)


module.exports = transactionEndpoints