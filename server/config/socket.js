/* istanbul ignore file */
const SocketHandler = require('../handlers/SocketHandler')

module.exports = {
    start: (io) => io.on('connection', (socket) => {
        // console.log('connected')
        socket.on('joinRoom', payload => {
            SocketHandler.joinRoom(payload, socket)
        })          
    })
}