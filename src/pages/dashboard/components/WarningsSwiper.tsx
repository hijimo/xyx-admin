import React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Autoplay } from 'swiper';

import styles from './WarningsSwiper.less';

interface WarningsSwiperProps {
  className?: string;
}
const WarningsSwiper: React.FC<WarningsSwiperProps> = ({ className }) => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={3}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      // loop={true}
      loop
      spaceBetween={12}
      className={classNames(className, styles.swiper)}
    >
      <SwiperSlide className={styles.slide}>
        设备名称： 这里显示告警信息主体，限制最多显示3行，动态轮播展示告警… 设备名称：
        这里显示告警信息主体，限制最多显示3行，动态轮播展示告警…
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        设备名称： 这里显示告警信息主体，限制最多显示3行，动态轮播展示告警… 设备名称：
        这里显示告警信息主体，限制最多显示3行，动态轮播展示告警…
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        设备名称： 这里显示告警信息主体，限制最多显示3行，动态轮播展示告警… 设备名称：
      </SwiperSlide>
      <SwiperSlide>
        设备名称： 这里显示告警信息主体，限制最多显示3行，动态轮播展示告警… 设备名称：
        这里显示告警信息主体，限制最多显示3行，动态轮播展示告警…
      </SwiperSlide>
      <SwiperSlide>
        设备名称： 这里显示告警信息主体，限制最多显示3行，动态轮播展示告警… 设备名称：
        这里显示告警信息主体，限制最多显示3行，动态轮播展示告警…
      </SwiperSlide>
    </Swiper>
  );
};

export default React.memo(WarningsSwiper);
