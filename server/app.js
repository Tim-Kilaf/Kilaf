require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 3000
const route = require('./routes')
const {errorHandler} = require('./middleware/errorHandler')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const io = require('socket.io')(http.createServer(app))

// const socket = require('../config/socket')(io)

app
    .use(cors())
    .use(fileUpload())
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(route(io))
    .use(errorHandler)

module.exports = app