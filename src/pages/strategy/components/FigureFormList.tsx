import AddButton from '@/components/FormList/AddButton';
import FormListTitle from '@/components/FormList/FormListTitle';
import Remove from '@/components/FormList/Remove';
import FigureSelect from '@/components/DataSelect/FigureSelect';
import { BooleanEnum } from '@/enum';
import type { AddStrategyParams, AddressListItemSSD, WarehouseSSD } from '@/types';
import { Col, Form, Input, Row } from 'antd';
import type { CardProps } from 'antd/es/card';
import type { FormInstance, Rule } from 'antd/es/form';
import type { FormListFieldData, FormListOperation } from 'antd/es/form/FormList';
import React, { useCallback, useMemo } from 'react';

interface FigureFormListProps extends CardProps {
  form?: FormInstance<AddStrategyParams>;
}

const FigureFormList: React.FC<FigureFormListProps> = ({ form, ...props }) => {
  const renderNormalBody = useCallback(
    (fields: FormListFieldData[], { add, remove }: FormListOperation) => {
      return (
        <React.Fragment>
          {fields.map((field, idx) => {
            return (
              <React.Fragment key={field.key}>
                <FormListTitle>
                  角色({idx + 1})
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
                    >
                      <Input maxLength={200} placeholder="请输入" />
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

export default FigureFormList;
