import { GatsbyImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import React from "react"
import Swiper from "react-id-swiper"

import "swiper/css/swiper.css"
import "./Carousel.css"

export const Carousel = ({ images }) => {
  const swiperParams = {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  }
  return (
    <Swiper {...swiperParams}>
      {images.map(image => {
        return (
          <div className='carousel' key={`slide_${image.id}`}>
            <GatsbyImage
              placeholder={"blurred"}
              image={image.gatsbyImageData}
              alt={image.title}
            />
          </div>
        )
      })}
    </Swiper>
  )
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Carousel
