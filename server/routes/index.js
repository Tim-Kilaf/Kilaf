module.exports = (io) => {
    const base = require('express').Router()

    const fs = require('fs')
    const path = require('path')
    const basename = path.basename(__filename)

    // base.get('/', (req, res) => {
    //     res.send('Hello World!')
    // })

    fs
    // read the whole file contents inside current dir
    .readdirSync(`${__dirname}/endpoints`)
    // filters out index.js and other non-JS files
        .filter(file => (file.indexOf !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    // then adds filtered list to the endpoints object
        .forEach(file => base.use(`/${file.split('.')[0]}`, require(path.join(`${__dirname}/endpoints`, file))(io)))

    return base
}