const { Biddings, Sequelize } = require('../models')

class BiddingController {
    static read = async (req, res, next) => {
        try {
            const { ItemId } = req.params

            const data = await Biddings.findAll(
                {
                    where: { ItemId },
                    order: ['price', 'DESC']
                }
            )

            res.status(200).json(data)
        } catch (err) {
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
                    order: ['price', 'DESC']
                }
            )

            res.status(200).json(data)
        } catch (err) {
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
                    order: ['price', 'DESC']
                }
            )

            res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }

    static readUser = async (req, res, next) => {
        try {
            const { ItemId, UserId } = req.params

            const data = await Bindings.findAll({ where: { ItemId, UserId } })

            res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }

    static create = async (req, res, next) => {
        try {
            const { user } = req.middleware
            const { ItemId, price, date } = req.body

            const payload = { UserId: user.id, ItemId, price, date }

            const data = await Bindings.create(payload)

            if (data) res.status(201).json({ message: 'Successfully added data' })
            else throw new Error({ code: 400, message: 'Bad request: invalid data supplied' })
        } catch (err) {
            return next(err)
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { id } = req.params

            const data = await Biddings.findOne({ where: id })

            if (data) {
                const result = await Bindings.destroy({ where: id })

                if (result) res.status(201).json({ message: 'Successfully added data' })
            } else throw new Error({ code: 404, message: 'Not found: The bidding data is not found.' })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports