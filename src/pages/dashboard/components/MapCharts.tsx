import React from 'react';
import * as echarts from 'echarts/core';
import { VisualMapComponent, GeoComponent, GridComponent } from 'echarts/components';
import { MapChart, EffectScatterChart, ScatterChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsReactProps } from 'echarts-for-react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import china from './china';

echarts.use([
  VisualMapComponent,
  GeoComponent,
  MapChart,
  ScatterChart,
  EffectScatterChart,
  GridComponent,
  CanvasRenderer,
  UniversalTransition,
]);

echarts.registerMap('china', china);

interface MapChartsProps extends Omit<EChartsReactProps, 'className'> {
  className?: string;
  // onClick?:(e)=>void;
}
const MapCharts: React.FC<MapChartsProps> = (props) => {
  return (
    <ReactEChartsCore
      // 清空默认样式
      style={{ height: '100%' }}
      notMerge={true}
      // opts={{ width: 1057, height: 811 }}
      lazyUpdate={true}
      {...props}
      echarts={echarts}
    />
  );
};
export default MapCharts;

// option && myChart.setOption(option);
