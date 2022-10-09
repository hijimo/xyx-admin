import React from 'react';
import EnumSelect from '@/pages/components/EnumSelect';

interface ProducetTypeSelectProps {
  placeholder?: string;
  disabled?: boolean;
}

const ProducetTypeSelect = ({ placeholder, disabled }: ProducetTypeSelectProps) => {
  return <EnumSelect enumKey="lineProductTypeEnum" placeholder={placeholder} disabled={disabled} />;
};

export default React.memo(ProducetTypeSelect);
