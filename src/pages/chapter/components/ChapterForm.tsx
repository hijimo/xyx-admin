import React, { useCallback } from 'react';
import _last from 'lodash/last';
import { useMutation } from 'react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Card, InputNumber } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddChapterParams } from '@/types';
import { addChapter, editChapter } from '@/services/chapter';
import Upload from '@/components/Upload';
import QuestionFormList from './QuestionFormList';
import styles from './ChapterForm.less';

interface ChapterFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddChapterParams>>;
  isEdit?: boolean;
  strategyId: number | string;
  onSuccess?: () => void;
}

const ChapterForm: React.FC<ChapterFormProps> = ({
  formRef,
  isEdit = false,
  strategyId,
  onSuccess,
  ...otherProps
}) => {
  const { mutate } = useMutation(
    (values: AddChapterParams) => (isEdit ? editChapter(values) : addChapter(values)),
    {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddChapterParams) => {
      const { questions, filesJson } = values;
      mutate({
        ...values,
        strategyId,
        filesJson: JSON.stringify(filesJson),
        questions: questions.map((q) => {
          return {
            ...q,
            roles: [
              {
                gameRoleId: q.gameRoleId,
              },
            ],
            options: new Array(4).fill(1).map((i, idx) => {
              return {
                optionContent: q[`optionContent${idx + 1}`],
                optionCorrect: q[`optionCorrect${idx + 1}`] === true ? 1 : 0,
                optionId: q[`optionId${idx + 1}`],
                questionId: q.questionId,
              };
            }),
          };
        }),
      });
    },
    [mutate, strategyId],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Card className={styles.card}>
        <Row gutter={100}>
          <Col span={24}>
            <Form.Item hidden name="chapterId">
              <Input placeholder="????????????????????????????????????" />
            </Form.Item>
            <Form.Item
              label="?????????"
              name="filesJson"
              valuePropName="fileList"
              rules={[{ required: true, message: '??????????????????' }]}
            >
              <Upload maxLength={1}>
                <PlusOutlined /> ??????
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="??????"
              name="chapterTitle"
              rules={[
                {
                  required: true,
                  message: '???????????????',
                },
              ]}
            >
              <Input placeholder="???????????????" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="??????"
              name="latitude"
              rules={[
                {
                  required: true,
                  message: '???????????????',
                },
              ]}
            >
              <Input placeholder="???????????????" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="??????"
              name="longitude"
              rules={[
                {
                  required: true,
                  message: '???????????????',
                },
              ]}
            >
              <Input placeholder="???????????????" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="????????????"
              name="chapterBackground"
              rules={[
                {
                  required: true,
                  message: '?????????????????????',
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="?????????????????????" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card className={styles.card} title="??????">
        <QuestionFormList name="questions" />
      </Card>
    </Form>
  );
};

export default ChapterForm;
