import React, { useState } from 'react';
import { Box, Container, makeStyles, Paper, Divider, Typography, Button } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { Switch as Switches } from '@material-ui/core';

import CartDetail from '../../components/cards/CartDetail'



export default function Cart() {
  const classes = useStyles();

  const [darkMode, setDarkMode] = useState(false)
  const palletType = darkMode ? "dark" : "light";

  const theme = createMuiTheme({
    palette: {
      type: palletType
    } 
  })
  return (
    <ThemeProvider theme={theme}>
      <Switches checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      <Container>
        <Container className={classes.container}>
          <Box className={classes.contentLeft}>
            <Paper elevation={2} className={classes.contentLeftTitle}>
              Your Cart
            </Paper>
            <Box className={classes.contentLeftBody}>
              <Box className={classes.contentLeftList}>
                {/* <Box>
                <Box style={{border: '1px red solid'}}>
                  <img src="https://bit.ly/347oSxW" height="100em" />
                </Box>
                <Box>
                  item detail
                </Box> */}
              </Box>
              <CartDetail />
              <Divider />
              <CartDetail />
            </Box>
          </Box>
          <Box className={classes.contentRight}>
            <Paper className={classes.contentRightItem}>
              <Typography style={{padding: 10}}>
                Summary
              </Typography>
              <Divider />
              <Box className={classes.boxItem}>
                <Typography>Subtotal</Typography>
                <Typography>Rp. 100.000</Typography>
              </Box>
              <Divider />
              <Box className={classes.boxItem}>
                <Typography>Biaya Pengiriman</Typography>
                <Typography>Rp. 40.000</Typography>
              </Box>
              <Divider />
              <Box className={classes.boxItem}>
                <Typography>Tax</Typography>
                <Typography>Rp. 40.000</Typography>
              </Box>
              <Divider />
              <Box className={classes.boxItem}>
                <Typography>Total</Typography>
                <Typography>Rp. 180.000</Typography>
              </Box>
              <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <Button variant="outlined" color="primary">
                  CHECKOUT
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 10
  },
  contentLeft: {
    width: '65%',
    // border: '1px red solid',
    padding: 10
  },
  contentLeftTitle: {
    width: '93%',
    padding: 10
  },
  contentLeftBody: {
    width: '95%',
    // border: '1px black solid',
  },
  contentLeftList: {
    display: 'flex',
  },
  contentRight: {
    width: '35%',
    height: '40%',
    // border: '1px red solid',
    padding: 10
  },
  contentRightItem: {
    padding: 10,
    height: '45vh'
  },
  boxItem: {
    display: 'flex', 
    justifyContent: 'space-between',
    padding: 10,
  }
}))