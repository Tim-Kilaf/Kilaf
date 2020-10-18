const { Transactions, Biddings, Items } = require('../models')

class TransactionController {
    constructor(io) {
        this.io = io
    }
    read = async (req, res, next) => {
        try {
            const dataTrx = await Transactions.findAll()
            // console.log(dataTrx)
            res.status(200).json(dataTrx)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    getUserTransactions = async (req, res, next) => {
        try {
            const {UserId} = req.params
            const userTrx = await Transactions.findAll({where: { UserId }})
            res.status(200).json(userTrx)
        } catch (error) {
            console.log(error)
        }
    }

    create = async (req, res, next) => {
        try {
            const { ItemId } = req.params

            const data = await Biddings.findAll(
                {
                    where: { ItemId },
                    order: [['price', 'DESC']]
                }
            )
            const amount = data[0].price
            const UserId = data[0].UserId
            console.log(UserId)

            const payload = {
                UserId,
                ItemId,
                status: 'pending',
                amount,
                date: new Date
            }
            const trx = await Transactions.create(payload)
            // console.log(trx)
            const itemUpdate = await Items.update({
                status: 'sold',
                HighestBiddingId: UserId,
                buyout_date: new Date
            },{
                where: {
                    id: ItemId
                }
            })

            res.status(201).json(trx)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    
    delete = async (req, res, next) => {
        try {
            const { UserId } = req.params

            const data = await Transactions.findAll({ where: { UserId }})

            if (data) {
                const result = await Transactions.destroy({ where: { UserId } })

                if (result) res.status(200).json({ message: 'Successfully deleted data' })
            } else throw new Error({ code: 404, message: 'Not found: The bidding data is not found.' })
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

    paid = async (req, res, next) => {
        try {
            const { UserId } = req.params
            const edited = await Transactions.update({
                status: 'paid'
            },{
                where: { UserId }
            })
            res.status(200).json({ message: 'Payment successfull'})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = (io) => new TransactionController(io)