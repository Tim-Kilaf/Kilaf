import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

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
  detailBox: {
    padding: '10px 30px',
    alignContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 10px',
      textAlign: 'center',
    }
  },
  priceBox: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      fontSize:13,            
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    [theme.breakpoints.down('xs')]: {
      margin: 0
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
  }
}));

export default function BiddingCard() {
  const classes = useStyles();

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
          <p className={classes.namaBarang}>Nama Barang</p>
          <Box className={classes.priceBox}>
            <Box>
              <p className={classes.priceDetail}>Starting Price</p>
              <p className={classes.priceDetail}>Rp. 100.000,00</p>
            </Box>
            <Box>
              <p className={classes.priceDetail}>Buyout Price</p>
              <p className={classes.priceDetail}>Rp. 100.000,00</p>
            </Box>
            <Box>
              <p className={classes.priceDetail}>Kelipatan Bid</p>
              <p className={classes.priceDetail}>Rp. 100.000,00</p>
            </Box>
          </Box>
          <Box className={classes.currentPrice}>
            <p>Current Price</p>
            <p className={classes.currentPriceText}>Rp. 250.000,00</p>
          </Box>
        </Box>
        <Box className={classes.detailBox}>
          <Box>
            <p>08.00 - 09.00</p>
          </Box>
          <Box className={classes.buttonBox}>
            <Button variant="contained" color="secondary">
              Details
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
