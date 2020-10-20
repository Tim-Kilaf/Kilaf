const authenticate = require('../../middleware/authentication')

module.exports = (io) => {
    const PaymentController = require('../../controllers/PaymentController')(io)
const paymentEndpoint = require('express').Router()

    return paymentEndpoint
    .get('/', authenticate, PaymentController.read)
    .post('/', authenticate, PaymentController.stripe)
    .post('/create/:TrxId/:amount', authenticate, PaymentController.create)
}
// module.exports = paymentEndpoint