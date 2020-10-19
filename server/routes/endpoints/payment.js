const authenticate = require('../../middleware/authentication')

module.exports = (io) => {
    const PaymentController = require('../../controllers/PaymentController')(io)
const paymentEndpoint = require('express').Router()

    return paymentEndpoint
    .get('/', PaymentController.read)
    .post('/', authenticate, PaymentController.stripe)
}
// module.exports = paymentEndpoint