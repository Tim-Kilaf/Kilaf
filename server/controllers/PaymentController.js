const { Payments } = require('../models')

class PaymentController {
    static read = async (req,res,next) => {
        try {
            const payment = await Payments.findAll()
            return res.sttaus(200).json(payment)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = PaymentController