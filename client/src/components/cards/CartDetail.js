import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { Button, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    }
  },

  date: {
    color: 'gray',
  },

  image: {
    width: '16em',
    height: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%'
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%'
    },
  },

  content: {
    display: 'grid',
    gap: '1em',
    margin: 20,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: 'fit-content',
      margin: '0 20',
    },
  },

  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "baseline",
    [theme.breakpoints.down('xs')]: {
      display: "grid",
      gridTemplateRows: '1fr'
    },
  },

  title: {
    fontSize: "1.5em",
    fontWeight: 700,
  },

  description: {
    [theme.breakpoints.down('xs')]: {
      marginRight: 10,
    },
  },

  details: {
    [theme.breakpoints.down('xs')]: {
      marginRight: 10,
    },
    display: 'block',
    margin: '10px 0'
  },

  price: {
    fontWeight: 400,
    fontSize: '1.25em',
    color: '#BA274A',
    margin: '1em 0',
  },

  reset: {
    margin: 0,
    padding: 0
  },
}));

export default function CartCard(props) {
  const { cart } = props

  const history = useHistory()
  const classes = useStyles()

  return (
    <Paper boxShadow={4} style={{ overflow: 'hidden' }}>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <img
            onClick={() => history.push(`/bid/${cart.id}`)}
            src={process.env.PUBLIC_URL + `../uploads/${cart.Item.ItemPictures[0].path}`}            
            className={classes.image}
            alt="kosong gaes"
          />
        </Box>
        <Box className={classes.content}>
          <Box className={classes.contentHeader}>
            <span className={classes.title}>{cart.Item.name}</span>
            <Moment className={classes.date} format="MMMM Do YYYY HH:mm">{cart.date}</Moment>
          </Box>
          <Box>
            <span className={classes.price}>Rp {cart.amount.toLocaleString('id-ID')}</span>
          </Box>
          <Box>
            <span className={classes.description}>{cart.Item.description}</span>
          </Box>
          {/* <Box>
            <Button variant="contained" onClick={() => history.push(`/bid/${cart.id}`)} color="primary">
              Details
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Paper>
  )
}
