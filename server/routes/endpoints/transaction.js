module.exports = (io) => {
    const TransactionController = require('../../controllers/TransactionControllers')(io)
    const authenticate = require('../../middleware/authentication')

    const transactionEndpoints = require('express').Router()

    return transactionEndpoints
    .get('/test-transaction', TransactionController.read)
    .get('/', authenticate, TransactionController.getUserTransactions)
    .post('/create/:ItemId', TransactionController.create)
    .get('/buyout/:ItemId', authenticate, TransactionController.createForBuyout)
    .delete('/:UserId', TransactionController.delete)
    .put('/paid/:UserId', TransactionController.paid)

}
// module.exports = transactionEndpoints