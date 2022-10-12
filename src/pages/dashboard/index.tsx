import React, { useCallback, useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { useQuery, useMutation } from 'react-query';
import _last from 'lodash/last';
import {
  getDashboardData,
  searchDashboardDeviceByKeyword,
  getProvinceDeviceCount,
  getCityDeviceList,
} from '@/services/dashboard';
import { getMapArea } from '@/services/common';
import { getToken } from '@/utils/ls';
import MapCharts from './components/MapCharts';
import DropdownTree from './components/DropdownTree';
import RightContent from './components/RightContent';
import PortalCard from './components/PortalCard';
import map from '@/assets/dashboard/map.png';
import grid from '@/assets/dashboard/grid.png';
import head from '@/assets/dashboard/head.png';
import logo from '@/assets/login-logo.png';
import {
  genMapOption,
  genMapData,
  genEffectScatterData,
  genSingleScatterData,
  genTotalScatterData,
  getAreaCodeByName,
  provinceDeviceCountData2ScatterData,
  chinaDeviceCountData2ScatterData,
  getCoordinateByName,
} from './components/mapUtils';
import type { EChartsOption } from './components/mapUtils';
import type { ResponseData } from '@/utils/request';
import type { DashboardSSD, DashboardSearchParams, DeviceGroupSSD } from '@/types';
import china from './components/china';
import MapModal from './components/MapModal';
import ChartView from './components/ChartView';
import type { RefMapModalProps } from './components/MapModal';

import styles from './index.less';

export const REFETCH_TIME = 300; // 单位秒，轮询时间
export const OTHER_REFETCH_TIME = 30;
interface MapNode {
  name: string;
  code: string | number;
}
const DashBoardIndex: React.FC = () => {
  const [groupCode, setGroupCode] = useState<string[] | undefined>(undefined);
  // 用来缓存groupData, 不频繁刷新groupTree
  const [groupData, setGroupData] = useState<DeviceGroupSSD[]>();
  const [currentPoint, setCurrentPoint] = useState<any>(null);

  const mapModalRef = useRef<RefMapModalProps>(null);

  const currentMapData = useRef(china);
  const mapPath = useRef<MapNode[]>([]);

  const token = getToken();

  if (!token) {
    window.location.href = '/user/login2';
  }

  useEffect(() => {
    window.REFETCH_TIME = REFETCH_TIME;
    window.OTHER_REFETCH_TIME = OTHER_REFETCH_TIME;
    const t = setInterval(() => {
      window.REFETCH_TIME = window.REFETCH_TIME - 1;
      if (window.REFETCH_TIME <= 0) {
        window.REFETCH_TIME = REFETCH_TIME;
        setGroupCode(undefined);
        mapModalRef.current?.hide();
        refetch();
      }
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, []);

  // 地图配置数据
  const [option, setOption] = useState<EChartsOption>(
    genMapOption({
      map: 'china',
      mapData: genMapData(china),
      scatterData: [],
      effectScatterData: [],
    }),
  );

  const { refetch } = useQuery(
    ['getDashboardData', _last(groupCode)],
    () =>
      getDashboardData({
        groupCode: _last(groupCode),
        token,
      }),
    {
      select: (d: ResponseData<DashboardSSD>) => d.data || [],
      onSuccess: (responseData) => {
        currentMapData.current = china;
        mapPath.current = [];
        if (!groupData || !groupData?.length) {
          setGroupData(responseData?.deviceGroupDtos);
        }

        setOption(
          genMapOption({
            map: 'china',
            mapData: genMapData(china),
            scatterData: genTotalScatterData(
              chinaDeviceCountData2ScatterData(china, responseData.provinceCountDtos),
            ),
            effectScatterData: genEffectScatterData(
              responseData.provinceCountDtos.map((it) => ({
                name: it.provinceName,
                value: [...getCoordinateByName(china, it.provinceName), it.totalCount],
              })),
            ),
          }),
        );
      },
    },
  );

  const { mutate: mutateMapData } = useMutation(({ code }: MapNode) => getMapArea(code), {
    onSuccess: (d, variables) => {
      if (d.data && d.data.length > 0) {
        const mapData = JSON.parse(d.data);
        const mapName = `${variables.code}`;
        echarts.registerMap(mapName, mapData);
        currentMapData.current = mapData;
        // 临时使用这种方式。
        // 有空了再改，时间紧迫
        const isProvince = mapName.includes('0000');
        const isCity = mapName.includes('00');

        if (isProvince) {
          getProvinceDeviceCount({
            provinceName: variables.name,
            token,
          }).then((res) => {
            mapPath.current.push({ name: variables.name, code: variables.code });
            setOption(
              genMapOption({
                map: mapName,
                mapData: genMapData(mapData),
                scatterData: genTotalScatterData(
                  provinceDeviceCountData2ScatterData(mapData, res.data),
                ),
                effectScatterData: genEffectScatterData(
                  res.data.map((it) => ({
                    name: it.cityName,
                    value: [...getCoordinateByName(mapData, it.cityName), 1],
                  })),
                ),
              }),
            );
          });
        } else if (isCity) {
          getCityDeviceList({
            cityName: variables.name,
            token,
          }).then((res) => {
            mapPath.current.push({ name: variables.name, code: variables.code });
            setOption(
              genMapOption({
                map: mapName,
                mapData: genMapData(mapData),
                scatterData: genSingleScatterData(res.data),
                effectScatterData: [],
              }),
            );
          });
        }
      }
    },
  });
  const { mutate } = useMutation(
    (params: DashboardSearchParams) => searchDashboardDeviceByKeyword(params),
    {
      onSuccess: (d) => {
        setOption((v) => ({
          ...genMapOption({
            map: v.geo!.map as string,
            mapData: v.series![0].data,
            scatterData: genSingleScatterData(d.data),
            effectScatterData: [],
          }),
        }));
      },
    },
  );

  //
  const handleChartClick = useCallback((e) => {
    window.REFETCH_TIME = REFETCH_TIME;
    const { seriesType, data: deviceData, event, name } = e;
    if (seriesType === 'scatter' && deviceData.id) {
      const { offsetX, offsetY } = event;
      setCurrentPoint({
        left: offsetX,
        top: offsetY,
        device: deviceData,
      });
    } else if (
      (['effectScatter', 'scatter'].includes(seriesType) && name) ||
      seriesType === 'map'
    ) {
      const code = getAreaCodeByName(currentMapData.current, name);

      // 直辖市直接弹弹窗
      if (
        code &&
        `${code}`.includes('0000') &&
        [120000, 110000, 310000, 500000].includes(code) === false
      ) {
        mutateMapData({ name, code });
      } else {
        const coordinate = getCoordinateByName(currentMapData.current, name);
        mapModalRef.current?.show({
          coordinate: {
            lng: coordinate[0],
            lat: coordinate[1],
          },
          code,
          name,
        });
      }
    }
    event.event.preventDefault();
    event.event.stopPropagation();
    return false;
  }, []);
  const handleMapClick = useCallback(() => {
    if (mapPath.current.length >= 2) {
      // 向上一层应该是通过爷爷节点，拿到父亲节点和它的兄弟们
      //  const parentNode =
      // pop parentNode
      mapPath.current.pop();
      const grandfatherNode = mapPath.current.pop();
      mutateMapData(grandfatherNode!);
    } else if (mapPath.current.length > 0 || currentMapData.current !== china) {
      mapPath.current = [];
      refetch();
    }
  }, []);
  const handleTreeSelect = useCallback((selectedKeys?: React.Key[]) => {
    console.log('selectedKeys', selectedKeys);
    setGroupCode(selectedKeys);
  }, []);
  return (
    // <Spin tip="加载中..." spinning={spinning}>
    <div
      className={styles.index}
      onClick={() => {
        window.REFETCH_TIME = REFETCH_TIME;
      }}
      onTouchStart={() => {
        window.REFETCH_TIME = REFETCH_TIME;
      }}
    >
      <img src={map} className={styles.map} />
      <img src={grid} className={styles.grid} />
      <div className={styles.header}>
        <img src={head} className={styles.img} />
        <img src={logo} className={styles.title} />
      </div>
      <RightContent />

      <div className={styles.center}>
        {groupData ? (
          <DropdownTree selectedKeys={groupCode} onSelect={handleTreeSelect} data={groupData} />
        ) : null}
        {/* <SearchBar className={styles.searchBar} onSearch={handleSearch} /> */}
      </div>
      <div onClick={handleMapClick} className={styles.maps}>
        <MapCharts option={option} onEvents={{ click: handleChartClick }} />
      </div>

      <ChartView groupCode={groupCode} />
      {currentPoint !== null && (
        <PortalCard
          onCancel={() => setCurrentPoint(null)}
          data={currentPoint}
          style={{ width: 320 }}
        />
      )}
      <MapModal ref={mapModalRef} />
    </div>
    // </Spin>
  );
};

export default DashBoardIndex;
