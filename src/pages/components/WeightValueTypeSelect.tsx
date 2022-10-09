import React from 'react';
import { WeightValueTypeList } from '@/enum';
import DefaultSelect from '@/components/DefaultSelect';

const WeightValueTypeSelect = () => {
  return <DefaultSelect data={WeightValueTypeList} />;
};

export default React.memo(WeightValueTypeSelect);
