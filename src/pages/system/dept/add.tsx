import React, { useRef, useCallback } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { AddDeptParams } from '@/types';
import DeptForm from './components/DeptForm';
const AddIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddDeptParams>>(null);
  const history = useHistory();

  const handleSuccess = useCallback(() => {
    message.success('添加成功');
    history.replace('/system/dept');
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
        <DeptForm isAdd formRef={formRef} onSuccess={handleSuccess} />
      </Card>
    </PageContainer>
  );
};

export default AddIndex;
