import React, { useMemo } from 'react';
import { Form, Button, Row, Col, InputNumber, message } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import type { FormInstance } from '@ant-design/pro-form';
import { UnitTypeDesc, UnitType } from '@/enum';
import styles from './PriceRange.less';

interface PriceRangeProps {
  /**
   *  1 重量，2 件数
   */
  offerType?: UnitType;
  readonly?: boolean;
  formRef?: React.MutableRefObject<FormInstance<any> | undefined>;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  offerType = UnitType.WEIGHT,
  readonly,
  formRef,
}) => {
  const unitText = useMemo(() => {
    return UnitTypeDesc[offerType] || '';
  }, [offerType]);
  const labelText = useMemo(() => {
    switch (offerType) {
      case UnitType.WEIGHT:
        return '重量区间';
      case UnitType.PIECES:
        return '件数区间';
      default:
        return '重量区间';
    }
  }, [offerType]);

  const initialValue = [
    {
      priedEndVal: undefined,
      priedStartVal: undefined,
      priedUnit: offerType,
    },
  ];

  return (
    <div className={styles.list}>
      <Form.List name="pricePriedList" initialValue={initialValue}>
        {(fields, { add, remove }) => (
          <>
            <div className={styles.desc}>
              {readonly !== true && (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (formRef?.current?.getFieldValue('pricePriedList').length >= 10) {
                      message.info('最多添加10个');
                      return;
                    }
                    add();
                  }}
                  type="primary"
                  className={styles.button}
                >
                  新增{labelText}
                </Button>
              )}
              <span className={styles.required}>*</span>
              有多个区间时， 请确保各区间连续，区间最多10个
            </div>
            {fields.map((field, index) => {
              if (index === 0) {
                return (
                  <Row gutter={24} key={field.key}>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        label={labelText}
                        validateFirst
                        rules={[{ required: true, message: `请输入${labelText}` }]}
                        key={`${field.key}priedEndVal`}
                        name={[field.name, 'priedEndVal']}
                      >
                        <InputNumber
                          placeholder={`请输入${labelText}`}
                          addonAfter={`${unitText}以内`}
                          disabled={readonly}
                        />
                      </Form.Item>
                    </Col>
                    <Form.Item hidden key={`${field.key}priedUnit`} name="priedUnit">
                      <InputNumber />
                    </Form.Item>
                  </Row>
                );
              }
              return (
                <Row gutter={24} key={field.key}>
                  <Col span={12}>
                    <div className={styles.box}>
                      <Form.Item
                        {...field}
                        label={labelText}
                        validateFirst
                        key={`${field.key}priedStartVal`}
                        name={[field.name, 'priedStartVal']}
                        rules={[{ required: true, type: 'number', message: '请输入' }]}
                      >
                        <InputNumber
                          addonAfter={unitText}
                          placeholder="请输入"
                          disabled={readonly}
                        />
                      </Form.Item>

                      <span className={styles.split}>-</span>
                      <Form.Item
                        {...field}
                        label={labelText}
                        validateFirst
                        key={`${field.key}priedEndVal`}
                        name={[field.name, 'priedEndVal']}
                        rules={[{ required: true, type: 'number', message: '请输入' }]}
                      >
                        <InputNumber
                          addonAfter={unitText}
                          placeholder="请输入"
                          disabled={readonly}
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        hidden
                        key={`${field.key}priedUnit`}
                        name={[field.name, 'priedUnit']}
                        initialValue={offerType}
                      >
                        <InputNumber />
                      </Form.Item>
                    </div>
                  </Col>
                  {!readonly && (
                    <Col>
                      <a onClick={() => remove(field.name)}>删除</a>
                    </Col>
                  )}
                </Row>
              );
            })}
          </>
        )}
      </Form.List>
    </div>
  );
};

export default PriceRange;
