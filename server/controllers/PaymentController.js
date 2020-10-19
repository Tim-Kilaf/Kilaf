const { Payments } = require('../models')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class PaymentController {
    constructor(io) {
        this.io = io
    }
    stripe (req,res,next) {
        console.log('masuk stripe')
        const { product, token } = req.body
        
        stripe.customers.create({
            email: 'customer@example.com',
            source: '1'
        })
        .then(customer => {
            console.log(customer.id)
            return stripe.invoiceItems.create({
                customer: token.name,
                amount: token.price,
                currency: 'usd'
            })
        })
        .then((invoiceItem) => {
            return stripe.invoices.create({
                collection_method: 'send_invoice',
                customer: invoiceItem.customer,  
            })
        })
        .then((invoice) => {
            return res.json(invoice)
        })
        .catch(error => console.error(error));
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