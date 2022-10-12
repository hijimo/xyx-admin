import React, { useRef, useCallback } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useLocation } from 'umi';
import type { Location } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { AddDeviceGroupParams } from '@/types';
import DeviceGroupForm from './components/DeviceGroupForm';
const AddIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddDeviceGroupParams>>(null);
  const location: Location = useLocation();
  const { companyNo } = location.query || {};
  const history = useHistory();

  const handleSuccess = useCallback(() => {
    message.success('添加成功');
    history.replace('/deviceGroup');
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
        <DeviceGroupForm
          companyNo={companyNo as string}
          formRef={formRef}
          onSuccess={handleSuccess}
        />
      </Card>
    </PageContainer>
  );
};

export default AddIndex;
