import io from 'socket.io-client'

import { detailItem } from '../store/actions/actionsItem'

let socket

export const initiateSocket = (room) => {
    socket = io('http://localhost:5000')

    console.log(`Establishing socket connection...`)

    if (socket && room) socket.emit('joinRoom', room)
}

export const disconnectSocket = () => {
    console.log(`Disconnecting socket...`)

    if (socket) socket.disconnect()
}

export const subscribeToBidding = (dispatch, id) => {
    if (!socket) return true

    socket.on('newBid', () => {
        console.log(`New data received!`)
        dispatch(detailItem(id))
    })

    socket.on('buyout', () => {
        console.log(`New data received!`)
        dispatch(detailItem(id))
    })
}

// export const addBid = (room, data) => {
//     if (socket) socket.emit('addBid', data)
// }