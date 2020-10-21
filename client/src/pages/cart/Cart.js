import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, makeStyles, Divider, Typography, Button, Grid } from '@material-ui/core';
import { getCarts } from '../../store/actions/actionsItem'
import StripeCheckout from 'react-stripe-checkout'

import CartDetail from '../../components/cards/CartDetail'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gap: '1.5em',
    marginBottom: '2em',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },

  card: {
    padding: 20,
    height: 'fit-content'
  },

  button: {
    padding: 10,
    width: "100%",
    marginTop: 20
  },

  gridRow: {
    display: 'grid',
    alignContent: 'start',
    gap: '1em'
  },

  boxItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  label: {
    fontWeight: 700
  },

  value: {
    textAlign: 'right'
  },

  valueLarge: {
    textAlign: 'right',
    fontSize: '1.25em',
    color: '#BA274A',
  },

  group: {
    marginBottom: '1em'
  }
}))

export default function Cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localAmount, setLocalAmount] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState('0');
  const [tax, setTax] = useState('0');
  const [amountForPaymentGateway, setAmountForPaymentGateway] = useState(0)

  const carts = useSelector(state => state.reducerItem.carts);

  useEffect(() => {
    let value = 0
    carts.map(cart => {
      value = value + cart.amount
    })
    setAmountForPaymentGateway(value)
    const formatted = new Intl.NumberFormat('id', { currency: 'IDR', style: 'currency'}).format(value)
    setLocalAmount(formatted)
  },[carts])

  useEffect(() => {
    dispatch(getCarts())
  }, [dispatch])

  const makePayment = (token) => {
    const body = {
      token,
      price: amountForPaymentGateway
    }
    const headers = {
      "Content-Type": "application/json",
      access_token: localStorage.getItem('access_token')
    }
    
    fetch(`http://localhost:3001/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        const { status } = response

      //mindahin item dari tabel transaction ke tabel payment
        carts.map(cart => {
        fetch(`http://localhost:3001/payment/create/${cart.id}/${cart.amount}`, {
          method: 'POST',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(() => {
          dispatch(getCarts())
        })
        .catch((err) => console.log(err))
      })
    })
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <h1> Cart </h1>
      <Grid container className={classes.container}>
        <Grid className={classes.gridRow}>
          {carts.length > 0 ?
            carts.map(cart => (
              <div key={cart.id}>
                <CartDetail cart={cart} />
              </div>
            )
            )
            : (
              <>
                <Typography>There are no items in your cart. Go win some item biddings!</Typography>
              </>
            )}
        </Grid>
        <Grid>
          <Box className={classes.group}>
            <Typography className={classes.label}>Subtotal</Typography>
            <Typography className={classes.value}>{localAmount.toLocaleString('id-ID')}</Typography>
            </Box>

          <Box className={classes.group}>
            <Typography className={classes.label}>Shipping Cost</Typography>
            <Typography className={classes.value}>{deliveryPrice.toLocaleString('id-ID')}</Typography>
            </Box>

          <Box className={classes.group}>
            <Typography className={classes.label}>Tax</Typography>
            <Typography className={classes.value}>{tax.toLocaleString('id-ID')}</Typography>
            <Divider />
            </Box>


          <Box className={classes.group}>
            <Typography className={classes.label}>Grand Total</Typography>
            <Typography className={classes.valueLarge}>{localAmount.toLocaleString('id-ID')}</Typography>
            </Box>

            <StripeCheckout 
            stripeKey="pk_test_51HdtTKAh63sGgRSDPUu44eUiZVFR5paJ77eJReP9VP2tgmyGkrlwm9NOXCavLUSSQN0Xdl6W65Ju1geL0ucsfx6u00K3WTaPRq"
            token={makePayment}
            currency='IDR'
            amount={amountForPaymentGateway * 100}
            style={{ display: "block", marginTop: 20 }}>
            <Button variant="contained" color="primary">
              CHECKOUT
              </Button>
          </StripeCheckout>
        </Grid>
      </Grid>
    </Container>
  )
}