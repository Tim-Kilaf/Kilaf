require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const cors = require('cors')
const errHandler = require('./middleware/errorHandler')

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(route)
  .use(errHandler)
  .listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
