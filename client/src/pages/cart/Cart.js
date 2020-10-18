import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, makeStyles, Paper, Divider, Typography, Button } from '@material-ui/core';
import { getCart, getItems } from '../../store/actions/actionsItem'


import CartDetail from '../../components/cards/CartDetail'

export default function Cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localAmount, setLocalAmount] = useState();

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const carts = useSelector(state => state.reducerItem.carts);
  console.log(carts, 'cart');

  return (
    <Container>
      <Container className={classes.container}>
        <Box className={classes.contentLeft}>
          <Paper elevation={2} className={classes.contentLeftTitle}>
            Your Cart
          </Paper>
          <Box className={classes.contentLeftBody}>
            {carts.map(cart => {
              return (
                <CartDetail cart={cart} />
              )
            })}
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
              <Typography>Rp. {localAmount}</Typography>
            </Box>
            <Divider />
            <Box className={classes.boxItem}>
              <Typography>Biaya Pengiriman</Typography>
              <Typography>Rp. 0</Typography>
            </Box>
            <Divider />
            <Box className={classes.boxItem}>
              <Typography>Tax</Typography>
              <Typography>Rp. 0</Typography>
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