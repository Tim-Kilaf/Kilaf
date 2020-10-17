require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const {errorHandler} = require('./middleware/errorHandler')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cron = require('node-cron')
const resolveBids = require('./cron/cronFunctions')


app
.use(cors())
.use(fileUpload())
.use(express.urlencoded({ extended: false }))
.use(express.json())
.use(route)
.use(errorHandler)

// CRON Function (Runs every minute 00-59)
cron.schedule('0-59 * * * *', () => {
    resolveBids()
})

module.exports = app