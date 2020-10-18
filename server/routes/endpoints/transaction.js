module.exports = (io) => {
    const TransactionController = require('../../controllers/TransactionControllers')(io)

const transactionEndpoints = require('express').Router()

    return transactionEndpoints
    .get('/', TransactionController.read)
    .get('/:UserId', TransactionController.getUserTransactions)
    .post('/create/:ItemId', TransactionController.create)
    .delete('/:UserId', TransactionController.delete)
    .put('/paid/:UserId', TransactionController.paid)

}
// module.exports = transactionEndpoints