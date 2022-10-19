import AddButton from '@/components/FormList/AddButton';
import FormListTitle from '@/components/FormList/FormListTitle';
import Remove from '@/components/FormList/Remove';
import FigureSelect from '@/components/DataSelect/FigureSelect';
import { BooleanEnum } from '@/enum';
import type { AddStrategyParams, AddressListItemSSD, WarehouseSSD } from '@/types';
import { Col, Form, Input, Row, Checkbox, InputNumber } from 'antd';
import type { CardProps } from 'antd/es/card';
import type { FormInstance, Rule } from 'antd/es/form';
import type { FormListFieldData, FormListOperation } from 'antd/es/form/FormList';
import React, { useCallback, useMemo } from 'react';

interface QuestionFormListProps extends CardProps {
  form?: FormInstance<AddStrategyParams>;
}

const QuestionFormList: React.FC<QuestionFormListProps> = ({ form, ...props }) => {
  const renderNormalBody = useCallback(
    (fields: FormListFieldData[], { add, remove }: FormListOperation) => {
      return (
        <React.Fragment>
          {fields.map((field, idx) => {
            return (
              <React.Fragment key={field.key}>
                <FormListTitle>
                  问题({idx + 1})
                  {idx > -1 && (
                    <Remove
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  )}
                </FormListTitle>
                <Row gutter={100}>
                  {/* 占位符 */}
                  <Col span={8}>
                    <Form.Item
                      label="角色"
                      rules={[
                        {
                          required: true,
                          message: `请选择角色`,
                        },
                      ]}
                      {...field}
                      name={[field.name, 'gameRoleId']}
                    >
                      <FigureSelect mode="multiple" placeholder="请选择角色" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="线索"
                      {...field}
                      key={[field.name, 'clue'].join('.')}
                      name={[field.name, 'clue']}
                      rules={[
                        {
                          required: true,
                          message: `请输入线索`,
                        },
                      ]}
                    >
                      <Input maxLength={200} placeholder="请输入" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={100}>
                  <Col span={8}>
                    <Form.Item
                      label="问题"
                      {...field}
                      key={[field.name, 'questionContent'].join('.')}
                      name={[field.name, 'questionContent']}
                      rules={[
                        {
                          required: true,
                          message: `请输入问题`,
                        },
                      ]}
                    >
                      <Input maxLength={200} placeholder="请输入问题" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="排序"
                      {...field}
                      key={[field.name, 'questionSort'].join('.')}
                      name={[field.name, 'questionSort']}
                      rules={[
                        {
                          required: true,
                          message: `请输入排序`,
                        },
                      ]}
                    >
                      <InputNumber maxLength={200} placeholder="请输入排序" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      key={[field.name, 'optionId1'].join('.')}
                      name={[field.name, 'optionId1']}
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="A"
                      {...field}
                      key={[field.name, 'optionContent1'].join('.')}
                      name={[field.name, 'optionContent1']}
                      rules={[
                        {
                          required: true,
                          message: `请输入选项A`,
                        },
                      ]}
                    >
                      <Input
                        maxLength={200}
                        placeholder="请输入问题"
                        addonAfter={
                          <Form.Item
                            {...field}
                            key={[field.name, 'optionCorrect1'].join('.')}
                            name={[field.name, 'optionCorrect1']}
                            valuePropName="checked"
                            noStyle
                          >
                            <Checkbox checked={false} />
                          </Form.Item>
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      key={[field.name, 'optionId2'].join('.')}
                      name={[field.name, 'optionId2']}
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="B"
                      {...field}
                      key={[field.name, 'optionContent2'].join('.')}
                      name={[field.name, 'optionContent2']}
                      rules={[
                        {
                          required: true,
                          message: `请输入选项B`,
                        },
                      ]}
                    >
                      <Input
                        maxLength={200}
                        placeholder="请输入问题"
                        addonAfter={
                          <Form.Item
                            {...field}
                            key={[field.name, 'optionCorrect2'].join('.')}
                            name={[field.name, 'optionCorrect2']}
                            valuePropName="checked"
                            noStyle
                          >
                            <Checkbox checked={false} />
                          </Form.Item>
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      key={[field.name, 'optionId3'].join('.')}
                      name={[field.name, 'optionId3']}
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="C"
                      {...field}
                      key={[field.name, 'optionContent3'].join('.')}
                      name={[field.name, 'optionContent3']}
                      rules={[
                        {
                          required: true,
                          message: `请输入选项C`,
                        },
                      ]}
                    >
                      <Input
                        maxLength={200}
                        placeholder="请输入问题"
                        addonAfter={
                          <Form.Item
                            {...field}
                            key={[field.name, 'optionCorrect3'].join('.')}
                            name={[field.name, 'optionCorrect3']}
                            valuePropName="checked"
                            noStyle
                          >
                            <Checkbox checked={false} />
                          </Form.Item>
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      key={[field.name, 'optionId4'].join('.')}
                      name={[field.name, 'optionId4']}
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="D"
                      {...field}
                      key={[field.name, 'optionContent4'].join('.')}
                      name={[field.name, 'optionContent4']}
                      rules={[
                        {
                          required: true,
                          message: `请输入选项D`,
                        },
                      ]}
                    >
                      <Input
                        maxLength={200}
                        placeholder="请输入问题"
                        addonAfter={
                          <Form.Item
                            {...field}
                            key={[field.name, 'optionCorrect4'].join('.')}
                            name={[field.name, 'optionCorrect4']}
                            valuePropName="checked"
                            noStyle
                          >
                            <Checkbox checked={false} />
                          </Form.Item>
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
          {fields.length < 20 && <AddButton onClick={() => add()}>新增</AddButton>}
        </React.Fragment>
      );
    },
    [],
  );
  return (
    <Form.List {...props}>
      {(fields, opts) => {
        return renderNormalBody(fields, opts);
      }}
    </Form.List>
  );
};

export default QuestionFormList;
