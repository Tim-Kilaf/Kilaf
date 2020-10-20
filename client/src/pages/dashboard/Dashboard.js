import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import { DashboardCarousel } from '../../components/carousel/DashboardCarousel'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { getHottestItems, getItems } from '../../store/actions/actionsItem'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '70%',
    margin: '0 auto',
    marginTop: 40,
    marginBottom: 40
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const items = useSelector(state => state.reducerItem.items)
  const hottestItems = useSelector(state => state.reducerItem.hottestItems)

  useEffect(() => {
    dispatch(getItems())
    dispatch(getHottestItems())
  }, [dispatch])

  return (
    <Box class={classes.mainContainer}>
      <DashboardCarousel data={hottestItems} text="Hottest Bids" />

      <DashboardCarousel data={items} text="Recommended Items for You" />
    </Box>
  )
}
