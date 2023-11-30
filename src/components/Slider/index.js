import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './index.module.scss'; 

const Index = ({ items, title, initialItemsToShow }) => {
    const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: false,
        loop: false,
        draggable: true,
        lazyLoad: true,
        speed: 500,
        centerMode: false,
        slidesToShow: 8,
        slidesToScroll: 8,
      };

      useEffect(() => {
        sliderRef.current.slickGoTo(0);
      }, [itemsToShow]);

    return (
        <div className={styles.slider_container}>
            <h2>{title}</h2>
            <Slider {...settings} ref={sliderRef} className={styles.slider_content}>
                {items.slice(0, itemsToShow).map((item) => (
                <div key={item.id} className={styles.slide_item}>
                    <img src={item.img} alt={item.name} className={styles.slide_item_img} />
                    <p>{item.name}</p>
                </div>
                ))}
            </Slider>
            {itemsToShow < items.length && (
                <button
                className={styles.showAllButton}
                onClick={() => setItemsToShow(items.length)}
                >
                Show All
                </button>
            )}
        </div>

  );
};

export default Index;
