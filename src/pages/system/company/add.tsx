import React, { useRef, useCallback } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { AddOrEditCompanyParams } from '@/types';
import { SwitchEnum } from '@/enum';
import CompanyForm from './components/CompanyForm';
const AddIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddOrEditCompanyParams>>(null);
  const history = useHistory();

  const handleSuccess = useCallback(() => {
    message.success('添加成功');
    history.replace('/system/company');
  }, [history]);

  const handleCancel = useCallback(() => {
    history.goBack();
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, []);

  return (
    <PageContainer
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          提交
        </Button>,
      ]}
    >
      <Card>
        <CompanyForm
          formRef={formRef}
          onSuccess={handleSuccess}
          initialValues={{
            state: SwitchEnum.ENABLED,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default AddIndex;
