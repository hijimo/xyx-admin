import React from 'react';
import EnumSelect from '@/pages/components/EnumSelect';

interface LogisticsTypeSelectProps {
  placeholder?: string;
  disabled?: boolean;
}

const LogisticsTypeSelect = ({ placeholder, disabled }: LogisticsTypeSelectProps) => {
  return <EnumSelect enumKey="logisticsModeEnum" placeholder={placeholder} disabled={disabled} />;
};

export default React.memo(LogisticsTypeSelect);
