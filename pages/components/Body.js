import React from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const images = [
    'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/82_inr.jpg',
    'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/83_inr.jpg',
    'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/84_inr.jpg',
    'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/81_inr.jpg',
    'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/80_inr.jpg',
    'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/78_inr.jpg'
  ];

const Slideshow = () => {
  return (
    <div className="slide-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
          }
        </Zoom>
      </div>
  )
}

export default Slideshow