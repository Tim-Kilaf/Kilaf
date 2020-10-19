import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { detailItem, addBidding } from '../../store/actions/actionsItem'; // merge line 5-6 to one
import { useHistory, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import NumericInput from 'react-numeric-input';
import { Button } from '@material-ui/core';
import socket from '../../config/socket-io'
import { disconnectSocket, initiateSocket, subscribeToBidding, buyout } from '../../sockets/biddingSocket';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '70%',
    marginTop: 50,
    marginBottom: 50,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
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
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 20,
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
    fontStyle: 'italic',
    color: '#2191fb'
  },
  price: {
    fontSize: 26,
    margin: '-10px 0',
    color: '#BA274A',
    fontWeight: 600
  },
  containerText: {
    marginLeft: 25
  },
  descriptionTitle: {
    fontSize: 25
  },
  description: {
    fontSize: 18,
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
    border: '1px solid gray',
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
  const dispatch = useDispatch()
  const param = useParams()
  const history = useHistory()

  const [room, setRoom] = useState(`item-${param.id}`)
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
        console.log('buyout max price');
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
    await fetch(`http://localhost:3001/transaction/buyout/${param.id}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })     
  }

  const handleBuyoutMaxPrice = async() => {
    // e.preventDefault()
    await fetch(`http://localhost:3001/transaction/buyout/${param.id}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(res => {
        console.log('success buyout');
      })
      .catch(err => {
        console.log(err);
      })
    // history.push('/')
  }

  return (
    <Box className={classes.container}>
      {data.item && data.item.ItemPictures && data.item.User &&
        <Box>
          <Box className={classes.containerDetail}>
            <Box style={{ width: '450px', borderRadius: 20 }} boxShadow={2}>
              <img
                src={require("../../assets/images/" + data.item.ItemPictures[0].path)}
                className={classes.image}
              />
            </Box>
            <Box className={classes.containerText}>
              <p className={classes.title}>{data.item.name}</p>
              <p className={classes.auctioneer}> {data.item.User.fullname} </p>
              <p className={classes.price}>Rp. {data.item.current_price.toLocaleString()} </p>
              <Box className={classes.priceDetailBox}>
                <p className={classes.priceDetail}>Buyout at Rp. {data.item.buyout_price.toLocaleString()} </p>
                <p className={classes.priceDetail}>Bid Multiplication Rp. {data.item.bid_increment.toLocaleString()} </p>
              </Box>
              <Box>
                Start at <Moment className={classes.priceDetail} format="YYYY/MM/DD HH:mm">{data.item.start_date}</Moment>
              </Box>
              <Box>
                End at  <Moment className={classes.priceDetail} format="YYYY/MM/DD HH:mm">{data.item.end_date}</Moment>
              </Box>
              <Box>
                {
                  !data.owner &&
                  <form onSubmit={(e) => handleSubmit(e)}
                    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px 0' }}>
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
          </Box>
          <Box style={{ padding: '0 2em' }}>
            <p className={classes.descriptionTitle}>Description</p>
            <p className={classes.description}> {data.item.description} </p>
          </Box>
          <hr className={classes.hr} />
          <p className={classes.descriptionTitle}>Bidder</p>
          {data.item.Biddings && data.item.Biddings.map(el => {
            return (
              <Box className={classes.bidder} boxShadow={3}>
                <Box> <p style={{ fontSize: 23 }}>Rp. {el.price.toLocaleString()} </p> </Box>
                <Box>
                  <p>Bidder</p>
                  <p> {el.User.fullname} </p>
                </Box>
                <Box>
                  <p>Bid Date</p>
                  <Moment style={{ margin: 0, padding: 0 }} format="YYYY/MM/DD HH:mm">{el.createdAt}</Moment>
                </Box>
              </Box>
            )
          })}
        </Box>
      }
    </Box>
  )
}
