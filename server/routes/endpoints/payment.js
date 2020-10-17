const PaymentController = require('../../controllers/PaymentController')
const paymentEndpoint = require('express').Router()

paymentEndpoint
    .get('/', PaymentController.read)
    
module.exports = paymentEndpoint