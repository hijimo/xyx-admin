import React, { useRef, useCallback } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { AddIOTCompanyConfigParams } from '@/types';
import IOTCompanyConfigForm from './components/IOTCompanyConfigForm';
const AddIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddIOTCompanyConfigParams>>(null);
  const history = useHistory();
  const { instanceId }: { instanceId: string } = useParams();

  const handleSuccess = useCallback(() => {
    message.success('添加成功');
    history.replace(`/iotc/config/${instanceId}`);
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
        <IOTCompanyConfigForm instanceId={instanceId} formRef={formRef} onSuccess={handleSuccess} />
      </Card>
    </PageContainer>
  );
};

export default AddIndex;
