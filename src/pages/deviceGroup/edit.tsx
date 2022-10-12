import React, { useRef, useCallback, useMemo } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams, useLocation } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { Location } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { AddDeviceGroupParams } from '@/types';
import { getDeviceGroupInfo } from '@/services/deviceGroup';
import DeviceGroupForm from './components/DeviceGroupForm';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddDeviceGroupParams>>(null);
  const history = useHistory();
  const location: Location = useLocation();
  const { companyNo, code, isAppendChild } = location.query || {};
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['deviceGroup', id], () => getDeviceGroupInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const { companyNo: initialCompanyNo, codePath, name, id: initialId } = data;

    const values: any = {
      companyNo: initialCompanyNo,
      codePath,
      id: initialId,
      name,
    };
    if (isAppendChild) {
      delete values.name;
      delete values.id;
    }
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['deviceGroup', id]);
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
        {initialValues !== undefined && (
          <DeviceGroupForm
            codePath={code as string}
            companyNo={companyNo as string}
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
