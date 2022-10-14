import React, { useRef, useCallback } from 'react';
import { Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import type { FormInstance } from 'antd/es/form';
import type { DictAddParams } from '@/types';
import ConfigForm from './components/ConfigForm';
import { ConfigTypeEnum } from '@/enum';

const urls_map = {
  [ConfigTypeEnum.AUDIO]: '/config/audio',
  [ConfigTypeEnum.IMAGE]: '/config/image',
  [ConfigTypeEnum.REWARD]: '/config/reward',
  [ConfigTypeEnum.REWARD_STRATEGY]: '/config/strategy',
  [ConfigTypeEnum.FIANL_REWARD]: '/config/final',
};
const AddIndex: React.FC = () => {
  const formRef = useRef<FormInstance<DictAddParams>>(null);
  const history = useHistory();

  const { type } = useParams() || {};

  const handleSuccess = useCallback(() => {
    message.success('添加成功');
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
      <ConfigForm type={type} formRef={formRef} onSuccess={handleSuccess} />
    </PageContainer>
  );
};

export default AddIndex;
