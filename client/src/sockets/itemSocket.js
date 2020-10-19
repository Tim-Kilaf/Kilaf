import io from 'socket.io-client'

import { getItems } from '../store/actions/actionsItem'

let socket

export const initiateSocket = (room) => {
    socket = io('http://localhost:5000')

    console.log('Establishing socket connection...')

    if (socket && room) socket.emit('joinRoom', room)
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...')

    if (socket) socket.disconnect()
}

export const subscribeToDashboard = (dispatch) => {
    if (!socket) return true

    socket.on('newItem', () => {
        console.log('New data received!')

        dispatch(getItems())
    })
}