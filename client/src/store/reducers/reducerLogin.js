// if role payload is added, change state to object and add role
function reducerLogin(state = false, action) {
    switch (action.type) {
        
        case 'LOGIN':
            localStorage.setItem('access_token', action.payload.access_token)
            return true

        case 'LOGOUT':
            localStorage.removeItem('access_token')
            return false
        
        default:
            return state
    }
}

export default reducerLogin