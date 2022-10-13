import React, { useRef, useCallback, useMemo } from 'react';
import _isNil from 'lodash/isNil';
import _first from 'lodash/first';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import type { AddFigureParams } from '@/types';
import { getFigureInfo } from '@/services/figure';
import FigureForm from './components/FigureForm';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddFigureParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['getFigureInfo', id], () => getFigureInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const values: any = {
      ...data,
      avatar: [
        {
          uid: new Date().valueOf(),
          url: data.avatar,
        },
      ],
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['getFigureInfo', id]);
    history.replace('/figure');
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
          <FigureForm
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
