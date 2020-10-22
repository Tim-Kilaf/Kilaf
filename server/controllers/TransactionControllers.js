const { Transactions, Biddings, Items, ItemPictures } = require('../models')
const io = require('../config/io-emitter');

class TransactionController {
    constructor(io) {
        this.io = io
    }

    getUserTransactions = async (req, res, next) => {
        try {
            const UserId = req.user.id
            const userTrx = await Transactions.findAll(
                {
                    where: { 
                        UserId,
                        status: 'pending'
                     },
                    include: {
                        model: Items,
                        include: [ItemPictures]
                      }
                }
            )
            res.status(200).json(userTrx)
        } catch (err) {
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

            const payload = {
                UserId,
                ItemId,
                status: 'pending',
                amount,
                date: new Date
            }
            const trx = await Transactions.create(payload)

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
            return next(err)
        }
    }

    createForBuyout = async (req,res, next) => {
        try {
            const { ItemId } = req.params

            const item = await Items.findOne({
                where: {
                  id: ItemId
                }
            })

            const buyoutPrice = item.dataValues.buyout_price

            const payload = {
                UserId: req.user.id,
                ItemId,
                status: 'pending',
                amount: buyoutPrice,
                date: new Date
            }

            const trx = await Transactions.create(payload)

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
            next(err)
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
            return next(err)
        }
    }
}

module.exports = (io) => new TransactionController(io)