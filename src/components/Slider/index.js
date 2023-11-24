// components/EmblaSlider.js
import React, { useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './index.module.scss'; 

const Index = ({ items, title }) => {

    const settings = {
        dots: true,
        infinite: false,
        loop: false,
        draggable: true,
        lazyLoad: true,
        speed: 500,
        centerMode: false,
        slidesToShow: 6,
        slidesToScroll: 6
      };

    return (
        <div className={styles.slider_container}>
            <h2>{title}</h2>
            <Slider {...settings} className={styles.slider_content}>
                {items.map((item) => (
                <swiper-slide key={item.id} className={styles.slide_item}>
                    <img src={item.img} alt={item.name} className={styles.slide_img} />
                    <p>{item.name}</p>
                </swiper-slide>
                ))}
            </Slider>
        </div>

  );
};

export default Index;
