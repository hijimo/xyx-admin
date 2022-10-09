import React from 'react';
import EnumSelect from '@/pages/components/EnumSelect';

interface CurrencySelectProps {
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const CurrencySelect = ({ placeholder, disabled, style }: CurrencySelectProps) => {
  return (
    <EnumSelect
      enumKey="settleCurrencyEnum"
      placeholder={placeholder}
      disabled={disabled}
      style={style}
    />
  );
};

export default React.memo(CurrencySelect);
