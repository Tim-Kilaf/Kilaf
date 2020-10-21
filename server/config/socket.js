/* istanbul ignore file */
const SocketHandler = require('../handlers/SocketHandler')

module.exports = {
    start: (io) => io.on('connection', (socket) => {
        socket.on('joinRoom', payload => {
            SocketHandler.joinRoom(payload, socket)
        })          
    })
}