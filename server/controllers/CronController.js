const { Items, Biddings } = require('../models')
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
        } catch (error) {
            console.log(error)
        }
    }
    static getWinningBids = async() => {
        try {
            const itemTimeOut = await Items.findAll({
                // include: [Biddings],
                where: {
                    end_date: {
                        [Op.lte]: new Date() 
                    },
                    status: 'unsold'
                },
                // order: [[ Biddings, 'price', 'DESC' ]]
            })
            // const highestBidder = itemTimeOut[0].Biddings[0]
            // const {UserId, ItemId, price} = highestBidder

            // console.log(UserId, ItemId, price)
            console.log({itemTimeOut}, 'contorller');
            return {itemTimeOut}.itemTimeOut
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CronController