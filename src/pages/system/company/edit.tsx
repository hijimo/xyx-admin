import React, { useRef, useCallback, useMemo } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import { getCompanyDetail } from '@/services/company';
import type { AddOrEditCompanyParams } from '@/types';
import CompanyForm from './components/CompanyForm';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddOrEditCompanyParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['CompanyDetail', id], () => getCompanyDetail(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const contactAddressPath =
      data?.contactAddressPath?.split(',')?.map((it) => parseInt(it, 10)) || null;
    const values: any = {
      ...data,
      contactAddressPath,
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['CompanyDetail', id]);
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
        {initialValues !== undefined && (
          <CompanyForm
            isEdit
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
