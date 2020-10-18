const CronController = require('../controllers/CronController');
const TransactionController = require('../controllers/TransactionControllers');
// const { Users, Sequelize } = require('../models')

async function resolveBids() {
    console.log('resolve bids at', new Date());
    const winningBids = await CronController.getWinningBids()

    console.log(winningBids, 'cronFunctions winningBids');

    winningBids.forEach(element => {
        // console.log(element.dataValues);
        let ItemId = element.dataValues.id
        let UserId = element.dataValues.UserId
        console.log(ItemId,UserId,'cronFunctions foreach  winningbids');
        const resolve = TransactionController.createForCron(ItemId)
        console.log(resolve);
    });
}

module.exports = resolveBids