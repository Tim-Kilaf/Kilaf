const errorHandler = (err, req, res, next) => {
    let { code, name, message, errors } = err

    if (code) {
        message = [message]
    } else {
        code = 500
        message = []

        switch(name){
            case 'SequelizeValidationError':
            case 'SequelizeUniqueConstraintError':
                statusCode = 400
                errors.forEach(err => errMessage.push(`${err.type}: ${err.message}`))
                break
            case 'JsonWebTokenError':
            default:
                errMessage.push("Whoops, something happened on our end!")
                break
        }
    }

    res.status(code).json(message)
}

module.exports = { errorHandler }