const { Payments, Transactions } = require('../models')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { v4: uuidv4 } = require('uuid')

class PaymentController {
    constructor(io) {
        this.io = io
    }
    stripe = async (req, res, next) => {
        const { price, token } = req.body

        if(req.user.email === token.email){
           
            const idempotencyKey = uuidv4()
         
            stripe.customers.create({
                email: token.email,
                source: token.id
            })
                .then((customer) => {
                return stripe.invoiceItems.create({
                    customer: customer.id,
                    amount: price * 100,
                    currency: 'idr'
                },{idempotencyKey})
            })
                .then((invoiceItem) => {
                return stripe.invoices.create({
                    collection_method: 'send_invoice',
                    customer: invoiceItem.customer,
                    due_date: new Date
                })
            })
            .then((invoice) => {
                return res.status(200).json(invoice)
            })
                .catch(error => {
                next(error)
            });
        }else{
            let error = {
                code: 400,
                message: 'Invalid email'
            }
            next(error)
        }
        
    }

    read = async (req, res, next) => {
        try {
            const payment = await Payments.findAll()
            return res.status(200).json(payment)
        } catch (err) {
            return next(err)
        }
    }

    create = async (req, res, next) => {
        try {
            const { TrxId, amount } = req.params

            const data = await Payments.create({
                TransactionId: +TrxId,
                amount: +amount,
                date: new Date
            })

            const UserId = req.user.id
            const paid = await Transactions.update({
                status: 'paid'
            },{
                where: { UserId }
            })

            return res.status(201).json({ message: 'Payment successfull'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = (io) => new PaymentController(io)