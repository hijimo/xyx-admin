import React, { useRef, useCallback, useMemo } from 'react';
import _isNil from 'lodash/isNil';
import _first from 'lodash/first';
import { Card, Button, message } from 'antd';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import type { AddStrategyParams } from '@/types';
import { getStrategyInfo } from '@/services/strategy';
import StrategyForm from './components/StrategyForm';
import { values } from 'lodash';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddStrategyParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['getStrategyInfo', id], () => getStrategyInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const values: any = {
      ...data,
      endDate: data.endDate ? moment(data.endDate) : undefined,
      filesJson: JSON.parse(data.filesJson),
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['getStrategyInfo', id]);
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
      <Card>
        {initialValues !== undefined && (
          <StrategyForm
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
