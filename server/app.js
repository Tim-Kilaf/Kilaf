require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const {errorHandler} = require('./middleware/errorHandler')
const cors = require('cors')
const fileUpload = require('express-fileupload')

app
.use(cors())
.use(fileUpload())
.use(express.urlencoded({ extended: false }))
.use(express.json())
.use(route)
.use(errorHandler)

module.exports = app