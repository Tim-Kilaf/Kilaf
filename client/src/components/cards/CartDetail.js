import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      textAlign: 'center'
    }
  },
  namaBarang: {
    fontSize: 25,
    fontWeight: 500,
    [theme.breakpoints.down('xs')]: {
      fontSize: 17
    },
  },
  priceDetail: {
    marginRight: 40,
    [theme.breakpoints.down('xs')]: {
      marginRight: 10,
    },
  },
  priceBox: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      fontSize:13,            
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
  },
  currentPrice: {
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      margin: 0
    },
  },
  currentPriceText: {
    fontSize: 23,
    fontWeight: 600,
    color: '#BA274A',
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    },
  },
  image: {
    width: '16em',
    height: '18em',
    objectFit: 'cover',
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%'
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%'
    },
  },
  detailBox: {
    marginLeft: 20
  }
}));

export default function CartCard(props) {
  const classes = useStyles();
  const { cart } = props;

  return (
    <Box boxShadow={3} style={{ backgroundColor: '#f7f7f7', borderRadius: 20, margin: '20px 0 10px 0'}}>
      <Box className={classes.cardContainer}>
        <Box>
          <img
            src={'https://www.pcgamesn.com/wp-content/uploads/2017/09/cpu-upgrade-900x506.jpg'}
            className={classes.image}
          />
        </Box>
        <Box className={classes.detailBox}>
          <p className={classes.namaBarang}>Id barang: {cart.ItemId}</p>
          <Box className={classes.priceBox}>
            <Box>
              <p className={classes.priceDetail}>Status: {cart.status}</p>
              <Moment format="MMMM Do YYYY HH:mm">{cart.date}</Moment>
            </Box>
          </Box>
          <Box className={classes.currentPrice}>
            <p className={classes.currentPriceText}>Rp {cart.amount.toLocaleString('id-ID')}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
