import React from 'react'
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
              <p className={classes.priceDetail}>Deskripsi barang</p>
              <p>We are your relatives pass the mayo, appeal to the client, sue the vice president yet i'll pay you in a week we don't tonight pay upfront i hope you understand. The website doesn't theme i was going for. </p>
            </Box>
          </Box>
          <Box className={classes.currentPrice}>
            <p className={classes.currentPriceText}>Rp. 250.000,00</p>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
