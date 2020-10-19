const { Transactions, Items, Biddings } = require('../models')
const {Op} = require('sequelize')

class CronController {
    static getItemByEndDate = async (req,res,next) => {
        try {
            const itemTimeOut = await Items.findAll({
                include: [Biddings],
                where: {
                    end_date: "2020-10-19T17:00:00.000Z"
                },
                order: [[ Biddings, 'price', 'DESC' ]]
            })
            const highestBidder = itemTimeOut[0].Biddings[0]
            const {UserId, ItemId, price} = highestBidder

            console.log(UserId, ItemId, price)

            // return res.status(200).json(itemTimeOut)
            return itemTimeOut
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
    static getWinningBids = async() => {
        try {
            const itemTimeOut = await Items.findAll({
                include: [Biddings],
                where: {
                    end_date: {
                        [Op.lte]: new Date() 
                    },
                    status: 'unsold'
                },
                // order: [[ Biddings, 'price', 'DESC' ]]
            })
            
            console.log({itemTimeOut}, 'contorller');
            return {itemTimeOut}.itemTimeOut
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
    static noBids = async(ItemId) => {
        try {
            const itemUpdate = await Items.update({
                status: 'closed',
            },
            {
                where: {
                    id: ItemId
                }
            })
            console.log(itemUpdate, 'controller no bids');
            return itemUpdate

        } catch (error) {
            console.log(error)
        }
    }
    static bidTransaction = async (ItemId) => {
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
            // io.emit('test',true)
            return trx
            // res.status(201).json(trx)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = CronController