
export function login(payload,cb) {
    return dispatch => {
        console.log(payload, 'action payload');
        fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            if (res.message === 'Invalid Username or Password') {
                console.log(res.message);
            } else {
                console.log(res,'res thunk login');
                // localStorage.setItem('access_token', res.access_token)
                dispatch({
                    type: 'LOGIN',
                    payload: res
                    // add payload role optional
                })
                cb('login')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export function logout() {
    return ({
        type: 'LOGOUT'
    })
}

export function register(payload) {
    return dispatch => {
        console.log(payload, 'action payload');
        fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res,'res thunk register');
            // localStorage.setItem('access_token', res.access_token)
            // dispatch({
            //     type: 'LOGIN',
            //     payload: res
            //     // add payload role optional
            // })
        })
        .catch(err => {
            console.log(err);
        })
    }
}