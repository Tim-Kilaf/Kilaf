const { Biddings, Sequelize, Items } = require('../models')
const SocketHandler = require('../handlers/SocketHandler')
const io = require('../config/io-emitter');

class BiddingController {
    constructor(io) {
        this.io = io
    }
    read = async (req, res, next) => {
        try {
            const { ItemId } = req.params

            const data = await Biddings.findAll(
                {
                    where: { ItemId },
                    order: [['price', 'DESC']]
                }
            )

            res.status(200).json(data)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    readDistinct = async (req, res, next) => {
        try {
            const { ItemId } = req.params

            const data = await Biddings.findAll(
                {
                    where: { ItemId },
                    attributes: [
                        [Sequelize.fn('DISTINCT', Sequelize.col('UserId')), 'UserId']
                    ],
                    order: [['price', 'DESC']]
                }
            )

            res.status(200).json(data)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    readGroupBy = async (req, res, next) => {
        try {
            const { ItemId } = req.params

            const data = await Biddings.findAll(
                {
                    where: { ItemId },
                    group: ['UserId'],
                    order: [['price', 'DESC']]
                }
            )

            res.status(200).json(data)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    readUser = async (req, res, next) => {
        try {
            const { ItemId, UserId } = req.params

            const data = await Biddings.findAll({ where: { ItemId, UserId } })

            res.status(200).json(data)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    create = async (req, res, next) => {
        try {
            const { id } = req.user
            const { ItemId, price } = req.body
            
            const payload = { UserId: id, ItemId, price, date: new Date }

            const data = await Biddings.create(payload)

            if (data) {
                console.log(err)
                await Items.update({ current_price: price },{ where: { id: ItemId }})

                this.io.emit('newBid', `item-${ItemId}`)

                res.status(201).json({ message: 'Successfully added data' })
            }
            else throw new Error({ code: 400, message: 'Bad request: invalid data supplied' })
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params

            const data = await Biddings.findOne({ where: id })

            if (data) {
                const result = await Biddings.destroy({ where: id })

                if (result) res.status(201).json({ message: 'Successfully added data' })
            } else throw new Error({ code: 404, message: 'Not found: The bidding data is not found.' })
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = (io) => new BiddingController(io)