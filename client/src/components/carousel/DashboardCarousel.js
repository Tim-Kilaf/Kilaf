import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BiddingCard from '../../components/cards/BiddingCard'
import { makeStyles } from '@material-ui/core/styles'

export function DashboardCarousel(props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1          
        }
      }
    ]
  };

  const useStyles = makeStyles((theme) => ({
    title: {
      margin: 0,
      [theme.breakpoints.down('xs')]: {
        fontSize: 21
      },
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '20px 0' }}>
        <div style={{ borderLeft: '6px solid #2191FB', height: 40, borderRadius: 10, marginRight: 20 }}></div>
        <div>
          <h1 className={classes.title}> {props.text} </h1>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          {props.data.length > 0 && props.data.map(items => {
            return (
              <BiddingCard data={items} />
            )
          })}
        </Slider>
      </div>      
    </div>
  )
}
