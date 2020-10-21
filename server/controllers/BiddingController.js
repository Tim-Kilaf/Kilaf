const { Biddings, Sequelize, Items } = require('../models')
const SocketHandler = require('../handlers/SocketHandler')
const io = require('../config/io-emitter');

class BiddingController {
    constructor(io) {
        this.io = io
    }

    create = async (req, res, next) => {
        try {
            const { id } = req.user
            const { ItemId, price } = req.body
            
            const payload = { UserId: id, ItemId, price, date: new Date }

            const data = await Biddings.create(payload)

            if (data) {
                await Items.update({ current_price: price },{ where: { id: ItemId }})

                this.io.emit('newBid', `item-${ItemId}`)

                res.status(201).json({ message: 'Successfully added data' })
            }
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = (io) => new BiddingController(io)