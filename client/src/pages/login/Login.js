import React, { useState } from 'react'
import { 
    Container, 
    makeStyles, 
    Paper, 
    Typography, 
    TextField,
    Button,
} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/actionsUser'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexwrap: 'wrap',
      height: '100vh',
      '& > *': {
        // margin: theme.spacing(),
        width: theme.spacing(70),
        height: theme.spacing(50),
      }
    },
    form: {
      '& > *': {
        margin: 15,
        width: '92%',
      },
    }
}))

export default function Login() {
    const classes = useStyles()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    function handleLogin(event) {
        event.preventDefault()
        let payload = {
            email,
            password
        }
        dispatch(login(payload,(cb) => {
            history.push('/')
        }))        
    }

    return (
        <Container className={classes.root}>
            <Paper elevation={3}>
                <Typography style={{margin: 20}} variant="h3">
                    Login
                </Typography>
                <form onSubmit={handleLogin} className={classes.form}>
                    <TextField 
                        placeholder="Type your email here" 
                        label="Email" 
                        variant="filled" 
                        InputLabelProps={{
                        shrink: true
                        }} 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <TextField 
                        placeholder="Type your password here" 
                        label="Password" 
                        variant="filled" 
                        InputLabelProps={{
                        shrink: true
                        }} 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>
                <Typography style={{display: 'flex', justifyContent: 'center'}}>
                Don't have an account? Register here
                </Typography>
            </Paper>
        </Container>
    )
}