import React, { useRef, useCallback, useMemo } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import type { EditDeviceInfoParams } from '@/types';
import { getDeviceInfo } from '@/services/device';
import DeviceEditForm from './components/DeviceEditForm';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<EditDeviceInfoParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['getDeviceInfo', id], () => getDeviceInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const { groupCodePath, aliasName, id } = data;

    const values: any = {
      id,
      // groupCode,
      groupCodePath: groupCodePath?.split(','),
      aliasName,
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['getDeviceInfo', id]);
    history.replace('/device');
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
          <DeviceEditForm
            companyNo={data?.companyNo}
            formRef={formRef}
            onSuccess={handleSuccess}
            initialValues={initialValues}
          />
        )}
      </Card>
    </PageContainer>
  );
};

export default EditIndex;
