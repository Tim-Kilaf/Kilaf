import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import BiddingCard from '../cards/BiddingCard'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 14,
    borderRadius: 15,
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  }
}));

export function DashboardCarousel(props) {
  const classes = useStyles();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true
  };

  return (
    <>
      <h1 style={{ marginTop: 60 }}> {props.text} </h1>
      <Box className={classes.container} boxShadow={3} >
        <Slider {...settings}>
          {props.data.length > 0 && props.data.map(items => {
            return (
              <BiddingCard data={items} />
            )
          })}
        </Slider>
      </Box>
    </>
  )
}
