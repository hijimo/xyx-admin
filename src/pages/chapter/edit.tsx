import React, { useRef, useCallback, useMemo } from 'react';
import _isNil from 'lodash/isNil';
import _first from 'lodash/first';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import type { AddChapterParams } from '@/types';
import { getChapterInfo } from '@/services/chapter';
import ChapterForm from './components/ChapterForm';
import { BooleanEnum } from '@/enum';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddChapterParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id, strategyId }: { strategyId: string; id: string } = useParams();

  const { data } = useQuery(['getChapterInfo', id], () => getChapterInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const { questions, filesJson } = data;
    const values: any = {
      ...data,
      filesJson: JSON.parse(filesJson),
      questions: questions.map((it) => {
        const r = {
          ...it,
          gameRoleId: it.roles.map((r) => r.gameRoleId),
        };
        it.options.forEach((o, idx) => {
          r[`optionContent${idx + 1}`] = o.optionContent;
          r[`optionId${idx + 1}`] = o.optionId;
          r[`optionCorrect${idx + 1}`] = o.optionCorrect === BooleanEnum.TRUE;
        });

        return r;
      }),
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['getChapterInfo', id]);
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
      <Card>
        {initialValues !== undefined && (
          <ChapterForm
            isEdit
            strategyId={strategyId}
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
