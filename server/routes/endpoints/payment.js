module.exports = (io) => {
    const PaymentController = require('../../controllers/PaymentController')(io)
const paymentEndpoint = require('express').Router()

    return paymentEndpoint
    .get('/', PaymentController.read)
}
// module.exports = paymentEndpoint