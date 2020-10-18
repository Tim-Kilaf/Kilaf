import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom'

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
    [theme.breakpoints.down('xs')]: {
      padding: '0px 10px',
      textAlign: 'center',
    }
  },
  dateBox: {
    padding: '40px 30px',    
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
      margin: '20px 0'
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

export default function BiddingCard(props) {
  const classes = useStyles();
  const history = useHistory()

  return props.data.ItemPictures.length > 0 && (
    <Box boxShadow={3} style={{ backgroundColor: '#f7f7f7', borderRadius: 20, margin: '20px 0 10px 0'}}>
      <Box className={classes.cardContainer}>
        <Box>
          <img
            src={require("../../assets/images/" + props.data.ItemPictures[0].path)}
            className={classes.image}
          />
        </Box>
        <Box className={classes.detailBox}>
          <p className={classes.namaBarang}> {props.data.name} </p>
          <Box className={classes.priceBox}>
            <Box>
              <p className={classes.priceDetail}>Starting Price</p>
              <p className={classes.priceDetail}>Rp. {props.data.starting_price.toLocaleString()}</p>
            </Box>
            <Box>
              <p className={classes.priceDetail}>Buyout Price</p>
              <p className={classes.priceDetail}>Rp. {props.data.buyout_price.toLocaleString()}</p>
            </Box>
            <Box>
              <p className={classes.priceDetail}>Kelipatan Bid</p>
              <p className={classes.priceDetail}>Rp. {props.data.bid_increment.toLocaleString()}</p>
            </Box>
          </Box>
          <Box className={classes.currentPrice}>
            <p>Current Price</p>
            <p className={classes.currentPriceText}>Rp. {props.data.current_price.toLocaleString()}</p>
          </Box>
        </Box>
        <Box className={classes.dateBox}>
          <Box>
            <Moment style={{ fontSize: 16 }} format="YYYY/MM/DD HH:mm">{props.data.start_date}</Moment> 
            <p style={{ fontSize: 15, fontStyle: 'italic', textAlign: 'center', margin: '10px 0' }}>Until</p>
            <Moment style={{ fontSize: 16 }} format="YYYY/MM/DD HH:mm">{props.data.end_date}</Moment>
          </Box>
          <Box className={classes.buttonBox}>            
            <Button onClick={() => history.push(`bid/${props.data.id}`)} variant="contained" color="secondary">
              Details
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
