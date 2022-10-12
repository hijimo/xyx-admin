import React from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { EChartsReactProps } from 'echarts-for-react';
import type { GaugeSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  GridComponentOption,
  TooltipComponentOption,
} from 'echarts/components';

import pointer from '@/pages/dashboard/assets/pointer.png';

echarts.use([GridComponent, GaugeChart, CanvasRenderer, TooltipComponent]);

export type ECOption = echarts.ComposeOption<
  GaugeSeriesOption | TitleComponentOption | GridComponentOption | TooltipComponentOption
>;

interface OnlineRateGaugeChartProps extends Omit<EChartsReactProps, 'option'> {
  className?: string;
  value: number;
}

const linear = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  {
    offset: 0,
    color: '#148DF6', // 0% 处的颜色
  },

  {
    offset: 0.5,
    color: '#F0DE3D', // 100% 处的颜色
  },
  {
    offset: 1,
    color: '#C85639', // 100% 处的颜色
  },
]);
const OnlineRateGaugeChart: React.FC<OnlineRateGaugeChartProps> = ({ value, ...props }) => {
  const option: ECOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: '10%',
      left: '5%',
      right: '10%',
      bottom: '20%',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        pointer: {
          show: true,
          icon: `image://${pointer}`,
          width: 39,
          length: 44.2,
        },
        min: 0,
        max: 1,
        radius: '100%',
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [[1, linear as any]],
          },
        },
        axisTick: {
          show: false,
        },
        title: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#80C4FF',
          fontSize: 12,
          fontFamily: 'din',
          distance: -6,

          formatter: function (v) {
            if (v === 1) {
              return '100';
            } else if (v === 0.5) {
              return '50';
            } else if (v === 0) {
              return '0';
            }
            return '';
          },
        },
        data: [
          {
            value: value,
            title: { show: false },
            detail: { show: false },
          },
        ],
      },
      {
        type: 'gauge',
        name: '内层辅助',
        radius: '85%',

        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 100,
        pointer: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 1,
          },
        ],
        axisLine: {
          show: true,
          lineStyle: {
            color: [[1, '#205296']],
            width: 1,
            opacity: 0.5,
          },
        },
        axisTick: {
          show: false,
        },

        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
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

export default React.memo(OnlineRateGaugeChart);
