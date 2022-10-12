import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Map, Marker, ZoomControl, InfoWindow, NavigationControl } from 'react-bmapgl';
import { Card, Badge } from 'antd';
import { getToken } from '@/utils/ls';
import { getDeviceInfo } from '@/services/device';
import { BooleanEnum, ReadWriteFlag } from '@/enum';
import type { DeviceSSD } from '@/types';
import { REFETCH_TIME } from '@/pages/dashboard/index';
import Controls from './Controls';
import styles from './BMap.less';

interface MapProps {
  className?: string;
  center: { lng: number; lat: number };
  data?: DeviceSSD[];
}

const BMap: React.FC<MapProps> = ({ className, center, data }) => {
  const mapRef = useRef();
  const [currentDevice, setCurrentDevice] = useState<DeviceSSD>();
  const [controls, setControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = getToken();

  const handlePreventDefault = (e) => {
    window.REFETCH_TIME = REFETCH_TIME;
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  useEffect(() => {
    if (center) {
      mapRef.current?.map.panTo(new BMapGL.Point(center.lng, center.lat));
    }
  }, [center]);

  const handleToggle = (e) => {
    // 因为这个是在百度地图，游离于文档外，要特殊处理
    console.log('onTouch');
    if (token && token.length > 0) {
      setControls((v) => !v);
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  const handleGetDeviceInfo = (deviceId: number) => {
    if (isLoading) return;

    setIsLoading(true);

    getDeviceInfo(deviceId)
      .then((res) => {
        const { metaDtos, ...others } = res.data;
        // ReadWriteFlag
        setCurrentDevice({
          metaDtos:
            metaDtos?.filter(
              (it) => it.rwFlag === ReadWriteFlag.READ_ONLY && it.showFlag === BooleanEnum.TRUE,
            ) || [],
          orderDtos:
            metaDtos?.filter(
              (it) => it.rwFlag === ReadWriteFlag.READ_WRITE && it.showFlag === BooleanEnum.TRUE,
            ) || [],
          ...others,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Map
      zoom="12"
      enableScrollWheelZoom
      ref={mapRef}
      center={center}
      className={classNames(styles.map, className)}
      style={{ height: 700 }}
    >
      {data?.map((it) => (
        <Marker
          position={{ lng: it.longitude, lat: it.latitude }}
          key={it.id}
          onClick={() => {
            handleGetDeviceInfo(it.id);
          }}
        />
      ))}
      {currentDevice !== undefined && (
        <InfoWindow
          position={new BMapGL.Point(currentDevice.longitude, currentDevice.latitude)}
          width={360}
          height={360}
          onClickclose={() => {
            setCurrentDevice(undefined);
          }}
          onClose={() => {
            setCurrentDevice(undefined);
          }}
        >
          <div
            className={styles.portalCard}
            onWheel={handlePreventDefault}
            onTouchStart={handlePreventDefault}
          >
            <Card bordered={false}>
              <div className={styles.header}>
                <div className={styles.deviceInfo}>
                  <div className={styles.name}>{currentDevice?.aliasName}</div>
                  <div className={styles.name}>{currentDevice?.name}</div>
                </div>
                <div className={styles.status}>
                  <Badge
                    className={styles.badge}
                    status={currentDevice?.onlineStatus === 'online' ? 'success' : 'default'}
                    text={currentDevice?.onlineStatusText}
                  />
                </div>
              </div>
              <div className={styles.body}>
                <div className={styles.title}>
                  <span className={styles.icon} />
                  <div className={styles.cn}>{controls ? '控制区' : '运行状态'}</div>
                  <a className={styles.mode} onClick={handleToggle}>
                    {controls ? '显示模式' : '控制模式'}
                  </a>
                </div>

                <div className={styles.container}>
                  {!controls && (
                    <div className={styles.grid}>
                      {currentDevice.metaDtos?.map((it) => {
                        return (
                          <div className={styles.item} key={it.metaKey}>
                            <div className={styles.label}>{it.metaName}</div>
                            <div className={styles.value}>
                              {it?.metaValue || '--'}
                              {it?.metaUnit || ''}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {controls && (
                    <Controls
                      data={currentDevice.orderDtos}
                      deviceCode={currentDevice.name}
                      id={currentDevice.id}
                      onSuccess={() => {
                        setCurrentDevice(undefined);
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </InfoWindow>
      )}

      <NavigationControl />
      <ZoomControl />
    </Map>
  );
};

export default BMap;
