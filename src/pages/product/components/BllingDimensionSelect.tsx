import React from 'react';
import EnumRadioGroup from '@/pages/components/EnumRadioGroup';

interface BllingDimensionSelectProps {
  disabled?: boolean;
}

const BllingDimensionSelect = ({ disabled }: BllingDimensionSelectProps) => {
  return <EnumRadioGroup enumKey="billingDimensionEnum" disabled={disabled} />;
};

export default React.memo(BllingDimensionSelect);
