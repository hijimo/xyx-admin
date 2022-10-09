import React, { useRef, useCallback } from 'react';
import { Input, Button, Select } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import CompanyTableModal from './CompanyTableModal';
import type { RefCompanyTableModalProps } from './CompanyTableModal';

interface CompanyFilterSelectProps {
  value?: DefaultOptionType[];
  onChange?: (value: DefaultOptionType[]) => void;
}

const CompanyFilterSelect = ({ value, onChange }: CompanyFilterSelectProps) => {
  const companyTableModalRef = useRef<RefCompanyTableModalProps>(null);

  const handleClick = useCallback(() => {
    companyTableModalRef.current?.show(value || []);
  }, [companyTableModalRef, value]);

  const handleSelect = useCallback(
    (rows) => {
      onChange?.(rows.map((item: DefaultOptionType) => item.value));
    },
    [onChange],
  );

  return (
    <Input.Group compact>
      <Select
        placeholder="请选择客户"
        style={{ width: 'calc(100% - 100px)' }}
        labelInValue
        mode="multiple"
        onChange={onChange}
        value={value}
        open={false}
        allowClear
      />
      <Button type="primary" style={{ width: 100 }} onClick={handleClick}>
        选择客户
      </Button>
      <CompanyTableModal ref={companyTableModalRef} onSelect={handleSelect} />
    </Input.Group>
  );
};

export default React.memo(CompanyFilterSelect);
