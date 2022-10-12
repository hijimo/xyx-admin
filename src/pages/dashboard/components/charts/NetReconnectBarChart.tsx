import React from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { EChartsReactProps } from 'echarts-for-react';
import type { BarSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  GridComponentOption,
  TooltipComponentOption,
} from 'echarts/components';

echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent]);

export type ECOption = echarts.ComposeOption<
  BarSeriesOption | TitleComponentOption | GridComponentOption | TooltipComponentOption
>;

interface NetReconnectBarChartProps extends EChartsReactProps {
  className?: string;
  data?: any[];
}

const NetReconnectBarChart: React.FC<NetReconnectBarChartProps> = ({ data, ...props }) => {
  const option = {
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      axisTick: false,
      axisLabel: { color: '#80C4FF', show: true, fontSize: 14 },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      data: data?.map((it) => it.name) || [],
    },
    yAxis: [
      {
        axisTick: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
          },
        },
        axisLabel: { color: '#80C4FF', fontFamily: 'din', fontSize: 14 },
      },
    ],

    grid: {
      top: '10%',
      left: '5%',
      right: '10%',
      bottom: '20%',
    },
    series: [
      {
        type: 'bar',
        barWidth: 32,
        data: data,
        itemStyle: {
          color: ({ data: currentData }: any) => {
            if (currentData > 45) {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#F08207' },
                { offset: 1, color: '#F08207' },
              ]);
            }
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#035AC4' },
              { offset: 1, color: '#258AFF' },
            ]);
          },
        },
      },
    ],
  };
  return (
    <ReactEChartsCore
      // 清空默认样式
      style={{ height: '100%' }}
      notMerge={true}
      lazyUpdate={true}
      {...props}
      echarts={echarts}
      option={option}
    />
  );
};

export default React.memo(NetReconnectBarChart);
