import React, { useRef, useCallback } from 'react';
import { Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { AddStrategyParams } from '@/types';
import StrategyForm from './components/StrategyForm';
const AddIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddStrategyParams>>(null);
  const history = useHistory();

  const handleSuccess = useCallback(() => {
    message.success('添加成功');
    history.replace('/strategy');
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
      <StrategyForm formRef={formRef} onSuccess={handleSuccess} />
    </PageContainer>
  );
};

export default AddIndex;
