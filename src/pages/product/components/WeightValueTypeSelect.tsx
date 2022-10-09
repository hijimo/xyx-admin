import React from 'react';
import EnumSelect from '@/pages/components/EnumSelect';

interface WeightValueTypeSelectProps {
  placeholder?: string;
  disabled?: boolean;
}

const WeightValueTypeSelect = ({ placeholder, disabled }: WeightValueTypeSelectProps) => {
  return <EnumSelect enumKey="weightValueTypeEnum" placeholder={placeholder} disabled={disabled} />;
};

export default React.memo(WeightValueTypeSelect);
