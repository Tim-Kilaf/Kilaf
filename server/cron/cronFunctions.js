/* istanbul ignore file */
const CronController = require('../controllers/CronController');
const TransactionController = require('../controllers/TransactionControllers');

async function resolveBids() {
    const winningBids = await CronController.getWinningBids()

    if (winningBids.length >= 1) {
        winningBids.forEach(element => {
            let ItemId = element.dataValues.id
            let UserId = element.dataValues.UserId
            let bids = element.dataValues.Biddings
    
            if (bids.length < 1) {
                const noBids = CronController.noBids(ItemId)
            } else {
                const resolve = CronController.bidTransaction(ItemId)
            }
        });
    }    
}

module.exports = resolveBids