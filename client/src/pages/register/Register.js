import React, { useState } from 'react';
import { 
  Container, 
  makeStyles, 
  Paper, 
  Typography, 
  TextField,
  Button,
} from "@material-ui/core";
// import { useHistory } from 'react-router-dom';

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
      height: theme.spacing(60),
    }
  },
  form: {
    '& > *': {
      margin: 15,
      width: '92%',
    },
  }
}))

export default function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    console.log(event.target.value,'<<< username change');
    setUsername(event.target.value);
  }
  const handleEmailChange = (event) => {
    console.log(event.target.value,'<<< email change');
    setEmail(event.target.value);

  }
  const handlePasswordChange = (event) => {
    console.log(event.target.value,'<<< password change');
    setPassword(event.target.value);

  }
  const handleSubmit = (event) => {
    // event.prefentDefault();
    console.log(event, 'submit form register');
  }

  return (
    <Container className={classes.root}>
      <Paper elevation={3}>
        <Typography style={{margin: 20}} variant="h3">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField 
            placeholder="Type your username here" 
            label="Username" 
            variant="filled" 
            InputLabelProps={{
              shrink: true
            }} 
            onChange={handleUsernameChange}
            value={username}
            required
          />
          <TextField 
            placeholder="Type your email here" 
            label="Email" 
            variant="filled" 
            InputLabelProps={{
              shrink: true
            }} 
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
            value={password}
            type="password"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
        <Typography style={{display: 'flex', justifyContent: 'center'}}>
          Have an account? Login here
        </Typography>
      </Paper>
    </Container>
  )
}
