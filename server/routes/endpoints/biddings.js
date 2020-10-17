const biddingEndpoints = require('express').Router()

const BiddingController = require('../../controllers/BiddingController')
const authenticate = require('../../middleware/authentication')


biddingEndpoints
    .get('/distinct/:ItemId', BiddingController.readDistinct)
    .get('/group/:ItemId', BiddingController.readGroupBy)
    .get('/:ItemId/:UserId', BiddingController.readUser) // test dulu yang ini
    .get('/:ItemId', BiddingController.read)
    .post('/', authenticate ,BiddingController.create)
    // .put('/:id', BiddingController.update) // gk ada update
    .delete('/:id', BiddingController.delete)

module.exports = biddingEndpoints