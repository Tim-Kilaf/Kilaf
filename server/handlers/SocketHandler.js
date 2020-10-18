const { Items, Biddings, Users } = require('../models')

class SocketHandler {
    // Event Handlers
    // kalau pake 'socket.emit', di sini
    static newBid = (id, socket, io) => {
        io.to(id).emit('cek', id)
        console.log('wadda')
    }

    static joinRoom = (id, socket, io) => {
        socket.join(id)
        console.log('joined')
    }

    static leaveRoom = (id, socket, io) => {
        socket.leave(id)
    }

    static test = (payload, socket) => {
        socket.emit('test', 'wadidaw')
    }
}

module.exports = SocketHandler