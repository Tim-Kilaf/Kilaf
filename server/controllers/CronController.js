const { Transactions, Items, Biddings } = require('../models')
const {Op} = require('sequelize')

class CronController {
    static getWinningBids = async() => {
        try {
            const itemTimeOut = await Items.findAll({
                include: [Biddings],
                where: {
                    end_date: {
                        [Op.lte]: new Date() 
                    },
                    status: 'unsold'
                }
            })

            return {itemTimeOut}.itemTimeOut
        } catch (err) {
            console.log(err)
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
            return itemUpdate

        } catch (err) {
            console.log(err)
        }
    }

    static bidTransaction = async (ItemId) => {
        try {
            const data = await Biddings.findAll(
                {
                    where: { ItemId: ItemId },
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

            return trx
        } catch (err) {
            console.log(err)
        }
  
    }
}

module.exports = CronController