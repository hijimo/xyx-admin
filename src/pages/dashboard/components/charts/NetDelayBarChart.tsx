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

interface NetDelayBarChartProps extends EChartsReactProps {
  className?: string;
}

const NetDelayBarChart: React.FC<NetDelayBarChartProps> = (props) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: [
      {
        type: 'category',
        axisTick: false,
        axisLine: {
          lineStyle: {
            width: 0,
          },
        },
        data: ['设备一', '设备二', '设备三', '设备四', '设备五', '设备六'],
      },
      {
        position: 'right',
        axisTick: false,
        axisLine: {
          lineStyle: {
            width: 0,
          },
        },
        axisLabel: { color: '#80C4FF', fontFamily: 'din' },
        data: [120, 200, 150, 80, 70, 110],
      },
    ],

    barWidth: 8,
    grid: {
      top: '5%',
      left: '10%',
      right: '10%',
      bottom: '15%',
    },
    series: [
      {
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110],
        showBackground: true,
        backgroundStyle: {
          color: '#14356C',
          borderRadius: 5,
        },
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#0268CC' },
            { offset: 1, color: '#EF8107' },
          ]),
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

export default React.memo(NetDelayBarChart);
