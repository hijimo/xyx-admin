import React, { useRef, useCallback, useMemo } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import { getIOTCompanyConfigInfo } from '@/services/iotc';
import type { AddIOTCompanyConfigParams } from '@/types';
import IOTCompanyConfigForm from './components/IOTCompanyConfigForm';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddIOTCompanyConfigParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();

  const { instanceId, id }: { instanceId: string; id: string } = useParams();

  const { data } = useQuery(['getIOTCompanyConfigInfo', id], () => getIOTCompanyConfigInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const values: any = {
      ...data,
      filePath: [
        {
          url: data.filePath,
          name: data.fileName,
        },
      ],
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['getIOTCompanyConfigInfo', id]);
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
        {initialValues !== undefined && (
          <IOTCompanyConfigForm
            formRef={formRef}
            instanceId={instanceId}
            onSuccess={handleSuccess}
            initialValues={initialValues}
          />
        )}
      </Card>
    </PageContainer>
  );
};

export default EditIndex;
