const { Items, Biddings, Users } = require('../models')

class SocketHandler {
    // Event Handlers
    // kalau pake 'socket.emit', di sini
    // static newBid = (id, socket) => {
    //     socket.to(id).emit('needsRefetch', true)
    // }

    static joinRoom = (payload, socket) => {
        socket.join(payload)
        // console.log(`${payload}`)
    }
}

module.exports = SocketHandler