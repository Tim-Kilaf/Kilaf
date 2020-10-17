const { Transactions, Biddings } = require('../models')

class TransactionController {
    static read = async (req,res,next) => {
        try {
            const dataTrx = await Transactions.findAll()
            // console.log(dataTrx)
            res.status(200).json(dataTrx)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static getUserTransactions = async (req,res,next) => {
        try {
            const {UserId} = req.params
            const userTrx = await Transactions.findAll({where: { UserId }})
            res.status(200).json(userTrx)
        } catch (error) {
            console.log(error)
        }
    }

    static create = async (req,res, next) => {
        try {
            const {UserId, ItemId} = req.body

            const data = await Biddings.findAll(
                {
                    where: { ItemId, UserId },
                    order: [['price', 'DESC']]
                }
            )
            const amount = data[0].price

            const payload = {
                UserId,
                ItemId,
                status: 'pending',
                amount,
                date: new Date,
                createdAt: new Date,
                updatedAt: new Date
            }

            const trx = await Transactions.create(payload)
            console.log(trx)

            res.status(201).json(trx)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    
    static delete = async (req, res, next) => {
        try {
            const { id } = req.params

            const data = await Transactions.findOne({ where: { id }})

            if (data) {
                const result = await Transactions.destroy({ where: { id } })

                if (result) res.status(200).json({ message: 'Successfully deleted data' })
            } else throw new Error({ code: 404, message: 'Not found: The bidding data is not found.' })
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

    static paid = async (req,res,next) => {
        try {
            const { id } = req.params
            const edited = await Transactions.update({
                status: 'paid'
            },{
                where: { id }
            })
            res.status(200).json({ message: 'Payment successfull'})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = TransactionController