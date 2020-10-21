module.exports = (io) => {
    const base = require('express').Router()

    const fs = require('fs')
    const path = require('path')
    const basename = path.basename(__filename)

    fs
        .readdirSync(`${__dirname}/endpoints`)
        .filter(file => (file.indexOf !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => base.use(`/${file.split('.')[0]}`, require(path.join(`${__dirname}/endpoints`, file))(io)))

    return base
}