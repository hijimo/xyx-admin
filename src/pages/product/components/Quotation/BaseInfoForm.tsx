import React, { useMemo } from 'react';
import { Form, Select, DatePicker } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';
import { DATE_FORMAT_FULL_TIME } from '@/utils/variables';
import type { SettingTypeSSD, OptionItemSSD } from '@/types';
import type { ChannelProductType } from '@/enum';
import InvalidDateInput from './InvalidDateInput';

interface PartitionSchemeProps {
  isAdded?: boolean;
  showPrice?: boolean;
  readonly?: boolean;
  priceLevelList?: SettingTypeSSD[];
  offerId?: number;
  productId?: number;
  productType?: ChannelProductType;
}

const BaseInfoForm: React.FC<PartitionSchemeProps> = ({
  showPrice = false,
  isAdded,
  readonly,
  offerId,
  productId,
  productType,
  priceLevelList,
}) => {
  const options: OptionItemSSD[] = useMemo(() => {
    return (
      priceLevelList?.map((it) => ({
        label: it.paramVal,
        value: it.id,
      })) || []
    );
  }, [priceLevelList]);

  function disabledDate(current: Moment) {
    return current && current < moment().startOf('day');
  }

  return (
    <>
      <Form.Item
        label="生效时间"
        name="gmtValid"
        rules={[{ required: true, message: '请填写生效时间', type: 'object' }]}
      >
        <DatePicker
          disabledDate={isAdded === false ? disabledDate : undefined}
          disabled={readonly}
          style={{ width: 300 }}
          showTime
        />
      </Form.Item>
      {showPrice && (
        <Form.Item
          label="价格等级"
          rules={[{ required: true, message: '请选择价格等级', type: 'number' }]}
          name="priceLevel"
        >
          <Select
            placeholder="请选择价格等级"
            disabled={readonly}
            options={options}
            style={{ width: 300 }}
          />
        </Form.Item>
      )}

      <Form.Item noStyle dependencies={['priceLevel', 'gmtValid']}>
        {({ getFieldValue }) => (
          <Form.Item
            label="失效时间"
            name="gmtUnvalid"
            validateFirst
            rules={[
              { required: false, message: '请先填写生效时间', type: 'string' },
              {
                validator(rule, value) {
                  const gmtValid: Moment = getFieldValue('gmtValid');
                  if (value === gmtValid.format(DATE_FORMAT_FULL_TIME)) {
                    return Promise.reject('失效时间不能和生效时间一致');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InvalidDateInput
              style={{ width: 300 }}
              gmtValid={
                getFieldValue('gmtValid')
                  ? getFieldValue('gmtValid').format(DATE_FORMAT_FULL_TIME)
                  : undefined
              }
              isAdded={isAdded}
              priceLevel={getFieldValue('priceLevel')}
              offerId={offerId}
              productId={productId}
              productType={productType}
              showPrice={showPrice}
            />
          </Form.Item>
        )}
      </Form.Item>
    </>
  );
};

export default BaseInfoForm;
