const { Transactions, Biddings, Items, ItemPictures } = require('../models')
const io = require('../config/io-emitter');

class TransactionController {
    constructor(io) {
        this.io = io
    }
    read = async (req, res, next) => {
        try {
            const dataTrx = await Transactions.findAll()
            // console.log(dataTrx)
            res.status(200).json(dataTrx)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    getUserTransactions = async (req, res, next) => {
        try {
            // console.log(req.user)
            const UserId = req.user.id
            const userTrx = await Transactions.findAll(
                {
                    where: { UserId },
                    include: {
                        model: Items,
                        include: [ItemPictures]
                      }
                }
            )
            res.status(200).json(userTrx)
        } catch (err) {
            console.log(err)
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
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    createForBuyout = async (req,res, next) => {
        try {
            const { ItemId } = req.params

            // const data = await Biddings.findAll(
            //     {
            //         where: { ItemId },
            //         order: [['price', 'DESC']]
            //     }
            // )
            // const amount = data[0].price
            // const UserId = data[0].UserId
            // console.log(UserId)

            const item = await Items.findOne({
                where: {
                  id: ItemId
                }
            })

            const buyoutPrice = item.dataValues.buyout_price
            console.log(item.dataValues.buyout_price,'buyout price');

            const payload = {
                UserId: req.user.id,
                ItemId,
                status: 'pending',
                amount: buyoutPrice,
                date: new Date
            }

            console.log(payload, 'buyout trx payload');
            const trx = await Transactions.create(payload)
            console.log(trx)
            const itemUpdate = await Items.update({
                status: 'sold',
                HighestBiddingId: req.user.id,
                buyout_date: new Date
            },{
                where: {
                    id: ItemId
                }
            })

            this.io.emit('buyout', `item-${ItemId}`)

            res.status(201).json(trx)
            
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    static createForCron = async (ItemId) => {
        try {
            // const { ItemId } = req.params

            const data = await Biddings.findAll(
                {
                    where: { ItemId: ItemId },
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
            return trx
            // res.status(201).json(trx)
        } catch (err) {
            console.log(err)
            return next(err)
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
        } catch (err) {
            console.log(err)
            return next(err)
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
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = (io) => new TransactionController(io)