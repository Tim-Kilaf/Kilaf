module.exports = (io) => {
    const TransactionController = require('../../controllers/TransactionControllers')(io)
// const TransactionController = require('../../controllers/TransactionControllers')
const authenticate = require('../../middleware/authentication')

const transactionEndpoints = require('express').Router()

    return transactionEndpoints
    .get('/', TransactionController.read)
    .get('/:UserId', TransactionController.getUserTransactions)
    .post('/create/:ItemId', TransactionController.create)
    // .get('/buyout/:ItemId', authenticate, TransactionController.createForBuyout)
    .delete('/:UserId', TransactionController.delete)
    .put('/paid/:UserId', TransactionController.paid)

}
// module.exports = transactionEndpoints