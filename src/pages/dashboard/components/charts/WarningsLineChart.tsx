import React from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { EChartsReactProps } from 'echarts-for-react';
import type { LineSeriesOption } from 'echarts/charts';
import type { GridComponentOption } from 'echarts/components';

echarts.use([GridComponent, LineChart, CanvasRenderer]);

export type ECOption = echarts.ComposeOption<LineSeriesOption | GridComponentOption>;

interface DayMessagePieChartProps extends EChartsReactProps {
  className?: string;
}

const DayMessagePieChart: React.FC<DayMessagePieChartProps> = (props) => {
  const option: ECOption = {
    backgroundColor: '#20599B',
    xAxis: {
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: '0',
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        symbolSize: 0,
        lineStyle: {
          color: '#0273D3',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#0271D2',
        },
      },
    ],
  };
  return (
    <ReactEChartsCore
      // 清空默认样式
      style={{ height: 83, border: '1px solid #20599B' }}
      notMerge={true}
      lazyUpdate={true}
      {...props}
      echarts={echarts}
      option={option}
    />
  );
};

export default React.memo(DayMessagePieChart);
