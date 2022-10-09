import React from 'react';
import EnumRadioGroup from '@/pages/components/EnumRadioGroup';

interface OfferTypeSelectProps {
  disabled?: boolean;
}

const OfferTypeSelect = ({ disabled }: OfferTypeSelectProps) => {
  return <EnumRadioGroup enumKey="offerTypeEnum" disabled={disabled} />;
};

export default React.memo(OfferTypeSelect);
