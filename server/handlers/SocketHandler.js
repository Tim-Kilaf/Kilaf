/* istanbul ignore file */
const { Items, Biddings, Users } = require('../models')

// This will be used for listening socket events
// emitted from client-side
class SocketHandler {
    static joinRoom = (payload, socket) => {
        socket.join(payload)
    }
}

module.exports = SocketHandler