import React, { useMemo } from 'react';
import _chunk from 'lodash/chunk';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Autoplay } from 'swiper';
import { Popover } from 'antd';
import type { DeviceWarnSSD } from '@/types';
import Card from '../Card';
import styles from './WarningsTableCard.less';
import classNames from 'classnames';

interface WarningsCardProps {
  data: DeviceWarnSSD[];
}
const WarningsTableCard: React.FC<WarningsCardProps> = ({ data }) => {
  const swiperData = useMemo(() => {
    if (data && data.length) {
      return _chunk(data, 6);
    }
    return [];
  }, [data]);

  return (
    <Card
      className={styles.warningsCard}
      bodyCls={styles.body}
      title="告警信息"
      enTitle="Alarm Information"
    >
      <div className={styles.table}>
        <div className={styles.thead}>
          <div className={styles.tr}>
            <div className={classNames(styles.td1, styles.td)}>设备名称</div>
            <div className={classNames(styles.td2, styles.td)}>省市</div>
            <div className={classNames(styles.td3, styles.td)}>告警信息</div>
            <div className={classNames(styles.td4, styles.td)}>是否解除告警</div>
          </div>
        </div>
        <Swiper
          direction="vertical"
          autoplay={
            data?.length > 6
              ? {
                  delay: 5000,
                  disableOnInteraction: false,
                }
              : undefined
          }
          modules={[Autoplay]}
          // loop={true}
          loop
          spaceBetween={12}
          className={styles.swiper}
        >
          {swiperData.map((item, idx) => (
            <SwiperSlide className={styles.slide} key={idx}>
              <div className={styles.tbody}>
                {item.map((it, idx) => (
                  <div className={styles.tr} key={idx}>
                    <div className={classNames(styles.td1, styles.td)}>{it.deviceCode}</div>
                    <div className={classNames(styles.td2, styles.td)}>
                      <Popover title={it.cityName}>{it.cityName}</Popover>
                    </div>
                    <div className={classNames(styles.td3, styles.td)}>{it.metaName}</div>
                    <div className={classNames(styles.td4, styles.td)}>{it.warnText}</div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Card>
  );
};

export default WarningsTableCard;
