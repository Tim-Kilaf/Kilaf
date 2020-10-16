import React, { useState } from 'react'
import { Box, Container, Typography, TextField, Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     heroText: {
//         marginTop: theme.spacing(8)
//     }
// }))

export default function Login() {
    // const classes = useStyles
    const [username,setUser] = useState('')
    const [password,setPassword] = useState('')


    return (
        <Container component="main" maxWidth="xs">
            <Typography variant='h1'>Login</Typography>
            <form>
                <TextField
                    id="username"
                    variant='filled'
                    label="Username"
                    margin='normal'
                    fullWidth
                    onChange={(e) => {setUser(e.target.value)}}
                />
                <TextField
                    id="password"
                    variant='filled'
                    label="Password"
                    type='password'
                    margin='normal'
                    fullWidth
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                // className={classes.submit}
                >
                    Login
                    </Button>
            </form>
            
        </Container>
    )
}