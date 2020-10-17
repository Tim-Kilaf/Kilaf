const { Biddings, Sequelize } = require('../models')

class BiddingController {
    static read = async (req, res, next) => {
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

    static readDistinct = async (req, res, next) => {
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

    static readGroupBy = async (req, res, next) => {
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

    static readUser = async (req, res, next) => {
        try {
            const { ItemId, UserId } = req.params

            const data = await Biddings.findAll({ where: { ItemId, UserId } })

            res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }

    static create = async (req, res, next) => {
        console.log('masuk')
        try {
            // const user = {
            //     id: 1
            // }
            const { user } = req.middleware
            const { ItemId, price, date } = req.body
            
            const payload = { UserId: user.id, ItemId, price, date: new Date }

            const data = await Biddings.create(payload)

            if (data) res.status(201).json({ message: 'Successfully added data' })
            else throw new Error({ code: 400, message: 'Bad request: invalid data supplied' })
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { id } = req.params

            const data = await Biddings.findOne({ where: id })

            if (data) {
                const result = await Biddings.destroy({ where: id })

                if (result) res.status(201).json({ message: 'Successfully added data' })
            } else throw new Error({ code: 404, message: 'Not found: The bidding data is not found.' })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = BiddingController