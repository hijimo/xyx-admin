import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ForecastContent from './components/ForecastContent';

export interface ForecastProps {
  className?: string;
}

const Forecast: React.FC<ForecastProps> = () => {
  return (
    <PageHeaderWrapper>
      <ForecastContent />
    </PageHeaderWrapper>
  );
};

export default Forecast;
