import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import { DashboadCarousel } from '../../components/carousel/DashboadCarousel'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../store/actions/actionsItem'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '70%',
    margin: '0 auto',
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  container: {        
    padding: 14,
    borderRadius: 15, 
    marginTop: 30,   
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const items = useSelector(state => state.reducerItem.items)

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  return (
    <Box class={classes.mainContainer}>
      <Box className={classes.container} boxShadow={2} >
        <DashboadCarousel data={items} text="New Item You Have To Check Out!"/>
      </Box>
      {/* <Box className={classes.container} boxShadow={3}>
        <DashboadCarousel data={items} text="Hottest Bids"/>
      </Box> */}
    </Box>
  )
}
