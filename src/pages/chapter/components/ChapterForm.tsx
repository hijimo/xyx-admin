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
      debugger;

      const { questions, filesJson } = values;
      mutate({
        ...values,
        strategyId,
        filesJson: JSON.stringify(filesJson),
        questions: questions.map((q) => {
          return {
            ...q,
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
              <Input placeholder="这是一个隐藏起来的表单域" />
            </Form.Item>
            <Form.Item
              label="背景图"
              name="filesJson"
              valuePropName="fileList"
              rules={[{ required: true, message: '请上传背景图' }]}
            >
              <Upload maxLength={1}>
                <PlusOutlined /> 上传
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="标题"
              name="chapterTitle"
              rules={[
                {
                  required: true,
                  message: '请输入标题',
                },
              ]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="纬度"
              name="latitude"
              rules={[
                {
                  required: true,
                  message: '请输入纬度',
                },
              ]}
            >
              <Input placeholder="请输入纬度" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="经度"
              name="longitude"
              rules={[
                {
                  required: true,
                  message: '请输入经度',
                },
              ]}
            >
              <Input placeholder="请输入经度" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="背景介绍"
              name="chapterBackground"
              rules={[
                {
                  required: true,
                  message: '请输入背景介绍',
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="请输入背景介绍" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card className={styles.card} title="问题">
        <QuestionFormList name="questions" />
      </Card>
    </Form>
  );
};

export default ChapterForm;
