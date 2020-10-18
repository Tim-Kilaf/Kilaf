const emitter = require('socket.io-emitter')({ host: 'localhost', port: 6379 });

const onError = (err) => {
    console.log(err)
}

emitter.redis.on('error', onError)

module.exports = emitter