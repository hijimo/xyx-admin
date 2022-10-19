import React, { useRef, useCallback } from 'react';
import { Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { AddChapterParams } from '@/types';
import ChapterForm from './components/ChapterForm';
const AddIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddChapterParams>>(null);
  const history = useHistory();
  const { strategyId }: { strategyId: string } = useParams();

  const handleSuccess = useCallback(() => {
    message.success('添加成功');
    history.replace(`/${strategyId}/chapter`);
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
      <ChapterForm strategyId={strategyId} formRef={formRef} onSuccess={handleSuccess} />
    </PageContainer>
  );
};

export default AddIndex;
