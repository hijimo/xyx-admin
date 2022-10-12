import * as echarts from 'echarts/core';
import type { GeoComponentOption, VisualMapComponentOption } from 'echarts/components';
import type {
  MapSeriesOption,
  EffectScatterSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts';
import type { DeviceSSD, ProvinceDeviceCountSSD, ProvinceCountData } from '@/types';
import symbolImg2 from '@/pages/dashboard/assets/2.png';
import mapPoint from '@/pages/dashboard/assets/map_point.png';
import singlePoint from '@/assets/dashboard/single_point.png';

export type EChartsOption = echarts.ComposeOption<
  | VisualMapComponentOption
  | GeoComponentOption
  | MapSeriesOption
  | EffectScatterSeriesOption
  | ScatterSeriesOption
>;

export interface MapOptionParams {
  map: string;
  mapData: any[];
  scatterData: any[];
  effectScatterData: any[];
}
export const genMapOption = ({
  map,
  mapData,
  scatterData,
  effectScatterData,
}: MapOptionParams): EChartsOption => {
  return {
    geo: {
      map,
      show: false,
      left: '0',
      top: '0',
      right: '0',
      bottom: '0',
      itemStyle: {
        // shadowColor: '#112F63',
        // shadowOffsetX: -20,
        // shadowOffsetY: 30,
      },
    },

    series: [
      {
        // id: 'population',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        type: 'map',
        map,
        animationDurationUpdate: 500,
        itemStyle: {
          areaColor: 'rgba(43,100,194,1)',
          shadowColor: 'rgba(4,21,56,0.16)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
        },
        universalTransition: {
          enabled: true,
          seriesKey: 'name1',
        },
        data: mapData,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        emphasis: {
          scale: false,
        },
        data: scatterData,
        symbolSize: [134, 95],
        labelLayout: {
          dy: -12,
        },
        animation: true,
        animationEasing: 'bounceOut',
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: effectScatterData,
        showEffectOn: 'render',
        color: '#F08207',
        rippleEffect: {
          period: 2,
          scale: 3,
          brushType: 'stroke',
        },
        symbolSize: [30, 30],
      },
    ],
  };
};

// 生成一个地图项假数据，主要用于动画
export const genMapData = (mapData: any) => {
  return mapData.features.map((it: any, idx: number) => ({
    name: it.properties.name,
    value: 1,
    groupId: `groupId_${idx}`,
  }));
};

// 特效颜色
const color = '#F08207';

interface ScatterData {
  name: string;
  value: (number | string)[];
}
// 生成涟漪特效数据
export const genEffectScatterData = (ary: ScatterData[]) => {
  return ary.map((it) => ({
    ...it,
    color: color,
    itemStyle: { color },
    symbol: `image://${symbolImg2}`,
  }));
};
// 生成单个设备标识数据

const genTotalDeviceLabelOption = () => {
  return {
    show: true,
    formatter: function (params) {
      const { data } = params;
      let res = '';
      res = ` {label|设备数}  {label|在线数} \n   {value|${data.totalCount || 0}}  {value2|${
        data.onlineCount || 0
      }}  `;

      return res;
    },
    padding: [8, 8],
    color: '#FFF',
    rich: {
      label: {
        fontSize: 16,
        color: '#fff',
        width: '50%',
      },
      value: {
        fontSize: 20,
        color: '#fff',
        padding: [8, 0, 0, 0],
        width: '50%',
        fontFamily: 'din',
      },
      value2: {
        fontSize: 20,
        color: '#fff',
        padding: [8, 0, 0, 0],
        width: '50%',
        fontFamily: 'din',
      },
    },
  };
};
// 生成统计设备标识数据

export const genTotalScatterData = (ary: ScatterData[]) => {
  return ary.map((it) => ({
    ...it,
    symbol: `image://${mapPoint}`,
    symbolOffset: [1, -40],
    label: genTotalDeviceLabelOption(),
  }));
};
export const genSingleScatterData = (ary: DeviceSSD[]) => {
  return ary.map((it) => ({
    ...it,
    name: it.provinceName,
    value: [it.longitude, it.latitude, it.id],
    symbol: `image://${singlePoint}`,
    symbolSize: [30, 30],
    // symbolOffset: [1, -40],
    // label: genSingleDeviceLabelOption(),
  }));
};

export const getAreaCodeByName = (mapData: any, name: string) => {
  return mapData.features.find((it: any) => it.properties.name === name)?.properties.adcode || '';
};
export const getCoordinateByName = (mapData: any, name: string) => {
  return mapData.features.find((it: any) => it.properties.name === name)?.properties.center || [];
};

export const chinaDeviceCountData2ScatterData = (
  mapData: any,
  data: ProvinceCountData[],
): ScatterData[] => {
  return data.map((it) => ({
    ...it,
    name: it.provinceName,
    value: [...getCoordinateByName(mapData, it.provinceName), it.totalCount],
  }));
};
export const provinceDeviceCountData2ScatterData = (
  mapData: any,
  data: ProvinceDeviceCountSSD[],
): ScatterData[] => {
  return data.map((it) => ({
    ...it,
    name: it.cityName,
    value: [...getCoordinateByName(mapData, it.cityName), it.totalCount],
  }));
};

// ProvinceDeviceCountSSD
