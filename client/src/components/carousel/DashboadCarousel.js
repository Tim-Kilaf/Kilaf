import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BiddingCard from '../../components/cards/BiddingCard'

export function DashboadCarousel(props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true
  };

  console.log(props.data)

  return (
    <div>
      <h1 style={{ marginLeft: 30 }}> {props.text} </h1>
      <Slider {...settings}>
        {props.data.length > 0 && props.data.map(items => {
          return (
            <BiddingCard data={items} />
          )
        })}
      </Slider>
    </div>
  )
}
