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
    width: '70%',
    margin: '0 auto',
    marginTop: '4em',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      marginTop: '2em'
    },
  },
  containerDetail: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  image: {
    width: '20em',
    height: '25em',
    objectFit: 'cover',
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  imageContainer: {
    width: '45%',
    marginRight: '2em',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      alignSelf: 'center'
    },
  },
  textDetail: {
    width: '45%',
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
  boxDetail: {
    display: 'flex',
    padding: '1em',
    borderRadius: 10,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    },
  },
  inputBox: {
    position: 'fixed',
    bottom: 0,
    width: '110%',
    backgroundColor: '#fcfcfc',
    marginLeft: '-50%',
    boxShadow: '-1px -9px 7px -8px rgba(0,0,0,0.61)',
    zIndex: 3,
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: '-5%'
    },
  },
  numericInput: {
    padding: 10
  },
  form: {
    display: 'flex',
    padding: '15px 0',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
  },
  bidButton: {
    display: 'flex',
    marginRight: '10%',
    marginLeft: 20,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      margin: 0,
      marginTop: 10
    },
  },
  owner: {
    justifyContent: 'flex-start',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  bid: {
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: 10
    },
  },
  bidderContainer: {
    marginBottom: 100,
    [theme.breakpoints.down('xs')]: {      
      marginBottom: 200
    },
  },
  bidTime: {
    display: 'flex',
    margin: '0 2em',
    [theme.breakpoints.down('xs')]: {      
      margin: 0
    },
  }
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
    <Box>
      {data.item &&
        <Box className={classes.container}>
          <Box className={classes.containerDetail}>
            <Box className={classes.imageContainer}>
              <Slider {...settings}>
                {data.item && data.item.ItemPictures.length > 0 && data.item.ItemPictures.map(item => {
                  return (
                    <img
                      src={process.env.PUBLIC_URL + `../uploads/${item.path}`}
                      className={classes.image}
                    />
                  )
                })}
              </Slider>
            </Box>
            <Box className={classes.textDetail}>
              <Box className={classes.containerText}>
                <Box style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: 30 }}>
                  <span>{data.item.name.toUpperCase()}</span>
                </Box>
                <Divider />
                <Box className={classes.containerDesc}>
                  <Grid item xs={3} sm={3} md={2}>
                    <p className={classes.descTitle}>CURRENT PRICE</p>
                  </Grid>
                  <Grid className={classes.descValue} item md={10}>
                    <p style={{ color: '#BA274A', fontSize: '1.5rem', fontWeight: 'bold' }}>Rp {data.item.current_price.toLocaleString('id-ID')} </p>
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
                    <p className={classes.descTitle}>MIN BID</p>
                  </Grid>
                  <Grid className={classes.descValue} item md={10}>
                    <p>Rp {data.item.bid_increment.toLocaleString('id-ID')} </p>
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
                <Box className={classes.inputBox}>          
                  {
                    !data.owner &&
                    <form onSubmit={(e) => handleSubmit(e)}
                      className={classes.form}
                    >
                      <Box>
                        <NumericInput className={classes.numericInput} defaultValue={(data.item.current_price)}
                          min={(data.item.current_price + data.item.bid_increment)} max={data.item.buyout_price}
                          step={data.item.bid_increment} onChange={setBid} />
                      </Box>
                      <Box className={classes.bidButton}>
                        <Box className={classes.bid}>
                          {!data.winner ?
                            <Box>
                              {data.highestBidder ?
                            <Button color="primary" variant="contained" disabled>
                              You are leading
                            </Button>
                            :
                            valid ?
                              <Button color="secondary" type="submit" variant="contained">
                                Start Bid
                              </Button>
                              :
                              <Button color="primary" variant="contained" disabled>
                                The Minimum Bid Is {(data.item.current_price + data.item.bid_increment)}
                              </Button>}
                            </Box>
                            :
                            <Box className={classes.bidButton}>                              
                              <h4 style={{ margin: 0 }}>The Bidding Is Over  </h4>                         
                            </Box>                            
                          }                          
                        </Box>
                        <Box style={{ textAlign: 'center' }}>
                          {!buyout ?
                            <Button color="primary" variant="contained" onClick={handleBuyout}>+ Buyout</Button>
                            :
                            <Button disabled>Sold Out</Button>}
                        </Box>
                      </Box>
                    </form>
                  }
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider style={{ marginTop: 40 }} />
          <Box style={{ display: 'flex', margin: 10 }}>
            <Box style={{ display: 'flex', alignItems: 'center' }} flexGrow={1}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Description</span>
            </Box>
          </Box>
          <Box style={{ margin: 10 }}>
            <p className={classes.description}> {data.item.description} </p>
          </Box>
          <Divider />
          <Box className={classes.bidderContainer}>
            <p style={{ margin: 10, fontSize: '1.2rem', fontWeight: 'bold' }}>Bidder</p>
            {data.item.Biddings && data.item.Biddings.map(el => {
              return (
                <Box boxShadow={3} style={{ borderRadius: 15 }}>
                  <Container>
                    <Grid container style={{ margin: 10 }}>
                      <Grid item xs={12} sm={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                          <Avatar style={{ backgroundColor: '#BA274A' }}>
                            {el.User.fullname ? el.User.fullname[0].toUpperCase() : 'A'}
                          </Avatar>
                        </Box>
                        {el.User.id !== data.winner ? 
                          <Box className={classes.bidder}>
                            <h3 style={{ margin: 0 }}>{el.User.fullname}</h3>
                            <Moment fromNow>{el.createdAt}</Moment>
                          </Box>
                          :
                          <Box className={classes.bidder}>
                            <h3 style={{ margin: 0 }}>{el.User.fullname} (winner)</h3>
                            <Moment fromNow>{el.createdAt}</Moment>
                          </Box> 
                        }                      
                      </Grid>
                      <Grid item xs={10} sm={10} md={9}>
                        <Grid item container style={{ margin: 10 }}>
                          <Box className={classes.boxDetail}>
                            <Box className={classes.bidTime}>
                              <CalendarTodayIcon />
                              <Grid className={classes.biddingDetail}>
                                <span style={{ color: 'rgba(0,0,0,.5)' }}>Bid Time:</span>
                                <Moment format="MMMM Do YYYY HH:mm">{el.createdAt}</Moment>
                              </Grid>
                            </Box>                            
                            <Box style={{ display: 'flex' }}>
                              <LocalOfferOutlinedIcon />
                              <Grid className={classes.biddingDetail}>
                                <span style={{ color: 'rgba(0,0,0,.5)' }}>Amount:</span>
                                <span>Rp {el.price.toLocaleString('id-ID')} </span>
                              </Grid>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
              )
            })}
          </Box>
        </Box>
      }
    </Box>
  )
}