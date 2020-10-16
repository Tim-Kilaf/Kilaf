import React from 'react'
import Box from '@material-ui/core/Box';
import BiddingCard from '../../components/cards/BiddingCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex', 
    flexDirection: 'column',
    width: '70%' ,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '90%' ,
    },
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.container}>
        <BiddingCard />
        <BiddingCard />
        <BiddingCard />
      </Box>
    </Box>
  )
}
