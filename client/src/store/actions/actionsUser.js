import axios from 'axios';

export const login = ({ email, password }) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(
                'http://localhost:3001/auth/login',
                {
                    email,
                    password,
                }
            ).then(({ data }) => {
                dispatch({
                    type: 'LOGIN',
                    payload: data
                })
                resolve();
            }).catch((error) => {
                reject(error);
            });
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
        fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
            .then(res => {
        })
        .catch(err => {
            console.log(err);
        })
    }
}