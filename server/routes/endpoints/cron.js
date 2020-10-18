const cronEndpoints = require('express').Router()
const CronController = require('../../controllers/CronController')

cronEndpoints
    .get('/', CronController.getItemByEndDate)

module.exports = cronEndpoints