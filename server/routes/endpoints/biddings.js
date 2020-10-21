module.exports = (io) => {
    const biddingEndpoints = require('express').Router()

    const BiddingController = require('../../controllers/BiddingController')(io)
    const authenticate = require('../../middleware/authentication')

    biddingEndpoints
        .post('/', authenticate, BiddingController.create)

    return biddingEndpoints
}
