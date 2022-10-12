import React from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { EChartsReactProps } from 'echarts-for-react';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  GridComponentOption,
  TooltipComponentOption,
} from 'echarts/components';

echarts.use([GridComponent, LineChart, BarChart, CanvasRenderer, TooltipComponent]);

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | TooltipComponentOption
  | LineSeriesOption
>;

interface DayActiveChartProps extends EChartsReactProps {
  className?: string;
  data?: any[];
}

const DayActiveChart: React.FC<DayActiveChartProps> = ({ data, ...props }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      axisTick: false,
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      axisLabel: { color: '#80C4FF', show: true, fontSize: 14 },
      data: data?.map((it) => it.name) || [],
    },
    yAxis: [
      {
        type: 'value',
        axisTick: false,
        axisLabel: { color: '#80C4FF', fontFamily: 'din', fontSize: 14 },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
          },
        },
        splitLine: {
          show: false,
        },
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
      {
        type: 'line',
        data: data,
        lineStyle: {
          color: '#fff',
        },
        itemStyle: {
          color: '#fff',
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

export default React.memo(DayActiveChart);
