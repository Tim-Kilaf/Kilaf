import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { detailItem, addBidding, getCarts } from '../../store/actions/actionsItem';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import NumericInput from 'react-numeric-input';
import { Button, Divider, Container, Grid, Avatar } from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { disconnectSocket, initiateSocket, subscribeToBidding } from '../../sockets/biddingSocket';


const useStyles = makeStyles((theme) => ({
  container: {
    margin: '100 100',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  containerDetail: {
    display: 'flex',
    padding: '3em 3em',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    marginRight: 30,
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  containerDesc: { 
    display: 'flex', 
    flexDirection: 'row'
  },
  descValue: {
    marginLeft: 30,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,.7)'
  },
  descTitle: {
    color: 'rgba(0,0,0,.5)',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 18,
    color: 'rgba(0,0,0,.6)'
  },
  bidder: {
    marginLeft: 10, 
    display: 'flex', 
    flexDirection: 'column'
  },
  biddingDetail: {
    display: 'flex', 
    flexDirection: 'column', 
    paddingLeft: '.5em'
  },
  boxDetail :{
    display:'flex', 
    padding: '1em', 
    borderRadius: 10
  },
}));

export default function Detail() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const param = useParams()

  const [room] = useState(`item-${param.id}`)
  const [bid, setBid] = useState(0)
  const [valid, setValid] = useState(false)
  const [buyout, setBuyout] = useState(false)

  const data = useSelector(state => state.reducerItem.item)

  useEffect(() => {
    if (room) initiateSocket(room)

    subscribeToBidding(dispatch, param.id)    

    return () => {
      disconnectSocket()
    }
  }, [room])

  useEffect(() => {
    dispatch(detailItem(param.id))
  }, [dispatch])  

  
  useEffect(() => {
    if (data.item) {
      if (data.owner || bid < (data.item.current_price + data.item.bid_increment - 1)) {
        setValid(false)
      } else if ((bid >= (data.item.current_price + data.item.bid_increment))) {
        setValid(true)
      }
    }

    if (data.item) {
      if (data.item.status === 'sold') {
        setBuyout(true)
      }
    }

    if (data.item) {
      if (data.item.current_price >= data.item.buyout_price && buyout === false) {
        handleBuyoutMaxPrice()
        setBuyout(true)
      }
    }
  }, [bid, data.item])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      price: bid,
      ItemId: param.id
    }

    dispatch(addBidding(payload))
  }

  const handleBuyout = async (e) => {
    e.preventDefault()       
    fetch(`http://localhost:3001/transaction/buyout/${param.id}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(() => dispatch(getCarts()))
  }

  const handleBuyoutMaxPrice = async () => {
    fetch(`http://localhost:3001/transaction/buyout/${param.id}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(() => {
        dispatch(getCarts())
      })
      .catch(err => {
        console.log(err);
      })
  }

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container classname={classes.container}>
      {data.item && data.item.ItemPictures && data.item.User &&
        <Box>
          <Grid container className={classes.containerDetail}>
            <Grid item xs={12} sm={12}  md={5}>
              <Slider {...settings} style={{marginRight: 20, marginTop:30}}>
                {data.item.ItemPictures.length > 0 && data.item.ItemPictures.map(item => {
                  return (
                    <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <img
                        src={process.env.PUBLIC_URL + `../uploads/${item.path}`}
                        className={classes.image}
                      />
                    </Box>
                    )
                  })}
                
              </Slider>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Box className={classes.containerText}>
                <Box style={{fontSize: '1.3rem', fontWeight: 'bold', marginTop: 30}}>
                  <span>{data.item.name.toUpperCase()}</span>
                </Box>
                <Divider />
                <Box className={classes.containerDesc}>
                  <Grid item xs={3} sm={3} md={2}>
                    <p className={classes.descTitle}>CURRENT PRICE</p>
                  </Grid>
                  <Grid className={classes.descValue} item md={10}>
                    <p style={{color: '#BA274A', fontSize: '1.5rem', fontWeight: 'bold'}}>Rp {data.item.current_price.toLocaleString('id-ID')} </p>
                  </Grid>
                </Box>
                <Divider />
                <Box className={classes.containerDesc}>
                  <Grid item xs={3} sm={3} md={2}>
                    <p className={classes.descTitle}>BUYOUT</p>
                  </Grid>
                  <Grid className={classes.descValue} item md={10}>
                    <p>Rp {data.item.buyout_price.toLocaleString('id-ID')} </p>
                  </Grid>
                </Box>
                <Divider />
                <Box className={classes.containerDesc}>
                  <Grid item xs={3} sm={3} md={2}>
                    <p className={classes.descTitle}>BID PRODUCT</p>
                  </Grid>
                  <Grid className={classes.descValue} item md={10}>
                    <p>Rp {data.item.bid_increment.toLocaleString('id-ID')} </p>
                  </Grid>
                </Box>
                <Divider />
                <Box className={classes.containerDesc}>
                  <Grid item xs={3} sm={3} md={2}>
                    <p className={classes.descTitle}>START AT</p>
                  </Grid>
                  <Grid className={classes.descValue} item md={10}>
                    <p><Moment format="MMMM Do YYYY HH:mm">{data.item.start_date}</Moment> </p>
                  </Grid>
                </Box>
                <Divider />
                <Box className={classes.containerDesc}>
                  <Grid item xs={3} sm={3} md={2}>
                    <p className={classes.descTitle}>END AT</p>
                  </Grid>
                  <Grid className={classes.descValue} item md={10}>
                    <p><Moment format="MMMM Do YYYY HH:mm">{data.item.end_date}</Moment></p>
                  </Grid>
                </Box>
                <Divider />
                <Box>
                  {
                    !data.owner &&
                    <form onSubmit={(e) => handleSubmit(e)}
                      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px 0' }}
                    >
                      <Box>
                        <NumericInput className="form-control" defaultValue={(data.item.current_price)}
                          min={(data.item.current_price + data.item.bid_increment)} max={data.item.buyout_price}
                          step={data.item.bid_increment} onChange={setBid} />
                      </Box>
                      <Box style={{ marginTop: 10 }}>
                        {data.highestBidder ?
                          <Button color="primary" variant="contained" disabled>
                            You are leading
                        </Button>
                          :
                          valid ?
                            <Button color="primary" type="submit" variant="contained">
                              Start Bid
                        </Button>
                            :
                            <Button color="primary" variant="contained" disabled>
                              The Minimum Bid Is {(data.item.current_price + data.item.bid_increment)}
                            </Button>}
                        <Box style={{ textAlign: 'center', marginTop: 10 }}>
                          {!buyout ?
                            <Button color="primary" variant="contained" onClick={handleBuyout}>Buyout</Button>
                            :
                            <Button disabled>Sold Out</Button> }
                        </Box>                      
                      </Box>
                    </form>
                  }
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Box style={{margin: 10, display: 'flex'}}>
            <Box style={{display: 'flex', alignItems: 'center'}} flexGrow={1}>
              <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Description</span>
            </Box>
          </Box>
          <Divider />
          <Box>
            <p className={classes.description}> {data.item.description} </p>
          </Box>
          <Divider />
          <p style={{margin: 10, fontSize: '1.2rem', fontWeight: 'bold'}}>Bidder</p>
          {data.item.Biddings && data.item.Biddings.map(el => {
            return (
              <Container>
                <Container>
                  <Grid container style={{margin: 10}}>
                    <Grid item xs={12} sm={12} md={3} style={{display: 'flex', marginTop: 10}}> 
                      <Box>
                        <Avatar style={{backgroundColor: '#BA274A'}}>
                          {el.User.fullname ? el.User.fullname[0].toUpperCase() : 'A'}
                        </Avatar>
                      </Box>
                      <Box className={classes.bidder}>
                        <span>{el.User.fullname}</span>
                        <Moment fromNow>{el.createdAt}</Moment>
                      </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={9}>
                      <Grid item container style={{margin: 10}}>
                        <Box boxShadow={3} className={classes.boxDetail}>
                          <Grid><CalendarTodayIcon /></Grid>
                          <Grid className={classes.biddingDetail}>
                            <span style={{color: 'rgba(0,0,0,.5)'}}>Bid Time:</span>
                            <Moment format="MMMM Do YYYY HH:mm">{el.createdAt}</Moment>
                          </Grid>
                          <Grid style={{paddingLeft: '1em'}}><LocalOfferOutlinedIcon /></Grid>
                          <Grid className={classes.biddingDetail}>
                            <span style={{color: 'rgba(0,0,0,.5)'}}>Bid Price:</span>
                            <span>Rp {el.price.toLocaleString('id-ID')} </span>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
                <Divider />
              </Container>
            )
          })}
        </Box>
      }
    </Container>
  )
}