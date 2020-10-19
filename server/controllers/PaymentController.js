const { Payments } = require('../models')

class PaymentController {
    constructor(io) {
        this.io = io
    }
    read = async (req, res, next) => {
        try {
            const payment = await Payments.findAll()
            return res.sttaus(200).json(payment)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = (io) => new PaymentController(io)