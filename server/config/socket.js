const SocketHandler = require('../handlers/SocketHandler')

module.exports = {
    start: (io) => io.on('connection', (socket) => {
        // Event Handlers
        socket.emit('FromAPI', { hello: 'data' })

        // Event Listeners
        // usage: socket.on('namaEvent', payload => {
        //     SocketHandler.namaEvent(payload, socket)
        // })

        socket.on('joinRoom', payload => {
            SocketHandler.joinRoom(payload, socket)
        })

        socket.on('newBid', payload => {
            SocketHandler.newBid(payload, socket)
        })
        socket.on('leaveRoom', payload => {
            SocketHandler.leaveRoom(payload, socket)
        })

        socket.on('test', payload => {
            SocketHandler.test(payload, socket)
        })
    })
}