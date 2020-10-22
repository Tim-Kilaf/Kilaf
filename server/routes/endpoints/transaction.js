module.exports = (io) => {
    const TransactionController = require('../../controllers/TransactionControllers')(io)
    const authenticate = require('../../middleware/authentication')

    const transactionEndpoints = require('express').Router()

    return transactionEndpoints
    .get('/', authenticate, TransactionController.getUserTransactions)
    .post('/create/:ItemId', TransactionController.create)
        .get('/buyout/:ItemId', authenticate, TransactionController.createForBuyout)
    .put('/paid/:UserId', TransactionController.paid)

}
// module.exports = transactionEndpoints