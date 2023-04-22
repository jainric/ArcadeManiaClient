import { useColorModeValue, useToken } from "@chakra-ui/react";
import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import GameSlide from "../gameSlide/GameSlide";
import games from "../../../../lib/components/games";

import styles from "../dashboardCarousel/styles/DashboardCarousel.module.scss";

/**
 * Dashboard Carousel displaying all the games in the application.
 * @returns Dashboard Carousel.
 */
const DashboardCarousel: React.FC = () => {
  const bg = useToken("colors", useColorModeValue("white", "gray.800"));
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Pagination, Navigation, Autoplay]}
      className={styles.mySwiper}
    >
      {Object.entries(games).map(([id, game]) => {
        return (
          <SwiperSlide
            className={styles.swiperSlide}
            style={{ backgroundColor: bg }}
            key={id}
          >
            <GameSlide game={game} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default DashboardCarousel;
