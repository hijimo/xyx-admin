import React, { useRef, useCallback, useMemo } from 'react';
import _isNil from 'lodash/isNil';
import _first from 'lodash/first';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import type { DictAddParams } from '@/types';
import { getDictItemByCode } from '@/services/dict';
import { ConfigTypeEnum } from '@/enum';
import ConfigForm from './components/ConfigForm';

const urls_map = {
  [ConfigTypeEnum.AUDIO]: '/config/audio',
  [ConfigTypeEnum.IMAGE]: '/config/image',
  [ConfigTypeEnum.REWARD]: '/config/reward',
  [ConfigTypeEnum.REWARD_STRATEGY]: '/config/strategy',
  [ConfigTypeEnum.FIANL_REWARD]: '/config/final',
};
const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<DictAddParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id, type }: { id: string; type: ConfigTypeEnum } = useParams();

  const { data } = useQuery(['getDictItemByCode', id], () => getDictItemByCode(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;

    const { dictValue, ...others } = data;

    const info = JSON.parse(dictValue);
    const values: any = {
      ...others,
      ...info,
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['getDictItemByCode', id]);
    history.replace(urls_map[type]);
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
          <ConfigForm
            isEdit
            type={type}
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
