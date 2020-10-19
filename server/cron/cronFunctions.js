const CronController = require('../controllers/CronController');
const TransactionController = require('../controllers/TransactionControllers');
// const { Users, Sequelize } = require('../models')

async function resolveBids() {
    console.log('resolve bids at', new Date());
    const winningBids = await CronController.getWinningBids()

    console.log(winningBids, 'cronFunctions winningBids');

    if (winningBids.length < 1) {
        console.log('no winning bids to resolve');
    } else {
        winningBids.forEach(element => {
            // console.log(element.dataValues);
            let ItemId = element.dataValues.id
            let UserId = element.dataValues.UserId
            let bids = element.dataValues.Biddings
    
            if (bids.length < 1) {
                console.log(ItemId,UserId,'no bids');
                const noBids = CronController.noBids(ItemId)
                console.log(noBids);
            } else {
                console.log(ItemId,UserId,'cronFunctions foreach  winningbids');
                const resolve = CronController.bidTransaction(ItemId)
                console.log(resolve);
            }
        });
    }    
}

module.exports = resolveBids