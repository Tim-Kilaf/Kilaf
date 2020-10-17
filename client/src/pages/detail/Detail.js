import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '70%',
    marginTop: 50,
    marginBottom: 50,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%',      
    },
  },
  containerDetail: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 2em',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    },
  },
  image: {
    width: '450px',
    height: '384px',
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  title: {
    fontSize: 35
  },
  auctioneer: {
    fontSize: 20,
    marginTop: -30,
    fontStyle: 'italic'
  },
  price: {
    fontSize: 26,
    marginTop: -5
  },
  containerText: {
    marginLeft: 25
  },
  descriptionTitle: {
    fontSize: 25
  },
  description: {  
    fontSize: 18,
    textAlign: 'justify'
  },
  priceDetailBox: {
    fontSize: 17,
    margin: '30px 0'
  },
  priceDetail: {
    fontSize: 17
  },
  hr: {
    margin: '3em 0',
    border: '1px solid black',
    borderRadius: 20    
  },
  bidder: {
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px'
  }
}));

export default function Detail() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box>
        <Box className={classes.containerDetail}>
          <Box style={{ width: '450px', borderRadius: 20 }} boxShadow={2}>
            <img
              src={'https://images-na.ssl-images-amazon.com/images/I/71qJkCH4EnL._SL1384_.jpg'}
              className={classes.image}
            />
          </Box>
          <Box className={classes.containerText}>
            <p className={classes.title}>Ryzen 3</p>
            <p className={classes.auctioneer}>Auctioneer</p>
            <p className={classes.price}>Rp. 250.000</p>
            <Box className={classes.priceDetailBox}>
              <p className={classes.priceDetail}>Buyout at Rp. 1.250.000</p>
              <p className={classes.priceDetail}>Bid Multiplication Rp. 1.250.000</p>
            </Box>
            <p className={classes.priceDetail}>Auction Ends at DDY/MM/YYYY HH:MM</p>
          </Box>
        </Box>
        <Box style={{ padding: '0 2em' }}>
          <p className={classes.descriptionTitle}>Description</p>
          <p className={classes.description}>We are your relatives pass the mayo, appeal to the client, sue the vice president yet i'll pay you in a week we don't need to pay upfront i
          hope you understand. The website doesn't have the theme i was going for do less with more and try a more powerful colour needs to be sleeker.</p>
        </Box>
        <hr className={classes.hr}/>
        <p className={classes.descriptionTitle}>Bidder</p>
        <Box className={classes.bidder} boxShadow={3}>          
          <Box> <p style={{ fontSize: 23 }}>Rp.250.000</p> </Box>
          <Box>
            <p>Bidder</p>
            <p>B** T***</p>
          </Box>
          <Box>
            <p>Bid Date</p>
            <p>08-07-2020 12:00</p>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
