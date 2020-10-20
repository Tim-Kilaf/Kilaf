let initialState = {
    isLogin: false,
    user: '',
    email: ''
}

// if role payload is added, change state to object and add role
function reducerLogin(state = initialState, action) {
    switch (action.type) {
        
        case 'LOGIN':
            localStorage.setItem('access_token', action.payload.access_token)
            console.log(action.payload,'action.payload');
            let newState = {
                ...state,
                isLogin: true,
                user: action.payload.username,
                email: action.payload.email
            }
            console.log(action,'reducerLogin');
            return newState

        case 'LOGOUT':
            localStorage.removeItem('access_token')
            return false
        
        default:
            return state
    }
}

export default reducerLogin