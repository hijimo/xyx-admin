import React from 'react';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components';
import numeral from 'numeral';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { EChartsReactProps } from 'echarts-for-react';
import type { PieSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  GridComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
} from 'echarts/components';

echarts.use([
  GridComponent,
  TitleComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  TooltipComponent,
]);

export type ECOption = echarts.ComposeOption<
  | LegendComponentOption
  | PieSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | TooltipComponentOption
>;

interface DayMessagePieChartProps extends EChartsReactProps {
  className?: string;
  data?: any[];
}

const colors = ['#76E8EC', '#50BB90', '#158CF2', '#FDD526', '#FD6631', '#554FAC'];

const DayMessagePieChart: React.FC<DayMessagePieChartProps> = ({ data, ...props }) => {
  const option: ECOption = {
    title: {
      text: numeral(data?.reduce((pre, next) => pre + next.value, 0) || 0).format('0,0'),
      top: 'center',
      left: '24%',
      textAlign: 'center',
      // borderColor: 'red',
      // borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontFamily: 'din',
        fontSize: 24,
      },
    },
    legend: {
      top: 'center',
      right: '10%',
      orient: 'vertical',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
      icon: 'circle',
      itemStyle: {
        borderWidth: 0,
      },
      formatter: (name) => {
        const item = data?.find((it) => it.name === name);
        return `${name}      ${item.value}`;
      },
      textStyle: {
        color: '#80C4FF',
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },
    barWidth: 8,
    grid: {
      top: '0%',
      left: '0%',
      right: '0%',
      bottom: '0%',
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['25%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        color: colors,
        labelLine: {
          show: false,
        },
        emphasis: {
          // scale: false,
        },
        data: data,
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

export default React.memo(DayMessagePieChart);
