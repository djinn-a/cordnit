'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { heroData } from '../../data/hero';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './HeroSlider.module.css';

export default function HeroSlider() {
  return (
    <div className={styles.heroWrapper}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        className={styles.swiperContainer}
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className={styles.slideBackground}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.overlay}></div>
              <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center">
                <div className="w-full md:w-2/3 lg:w-1/2 py-20 md:py-32">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed drop-shadow-sm">
                    {slide.description}
                  </p>
                  <a href={slide.buttonLink} className="inline-block px-8 py-4 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors shadow-lg">
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
