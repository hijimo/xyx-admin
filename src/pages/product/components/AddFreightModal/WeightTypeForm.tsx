import { Form, Radio, InputNumber, Row, Col } from 'antd';
import { WeightType } from '@/enum';
import styles from './WeightTypeForm.less';

interface WeightTypeFormProps {
  onChange: () => void;
  disabled?: boolean;
}

const WeightTypeForm = ({ disabled, onChange }: WeightTypeFormProps) => {
  return (
    <Form.Item
      label="重量类型"
      name="weightType"
      rules={[{ required: true, message: '请选择重量类型' }]}
    >
      <Radio.Group onChange={onChange} disabled={disabled}>
        <Radio value={1}>实重</Radio>
        <Form.Item noStyle dependencies={['weightType']}>
          {({ getFieldValue }) => {
            return (
              <>
                <Radio value={2}>
                  <Form.Item help={<span>{null}</span>} className={styles.noExplain}>
                    <Row align="middle" gutter={5}>
                      <Col>体积重-实重≤</Col>
                      <Col>
                        <Form.Item
                          noStyle
                          name="weightTypeMinusValue"
                          rules={[
                            {
                              required: getFieldValue('weightType') === WeightType.ALLCAST,
                              message: '请输入',
                            },
                          ]}
                        >
                          <InputNumber
                            min={0}
                            style={{ width: 60 }}
                            precision={0}
                            disabled={getFieldValue('weightType') !== WeightType.ALLCAST}
                          />
                        </Form.Item>
                      </Col>
                      <Col>KG免抛，大于则按</Col>
                      <Col>
                        <Form.Item
                          name="castMinusRatio"
                          noStyle
                          rules={[
                            {
                              required: getFieldValue('weightType') === WeightType.ALLCAST,
                              message: '',
                            },
                          ]}
                        >
                          <InputNumber
                            min={0.01}
                            style={{ width: 60 }}
                            precision={2}
                            disabled={getFieldValue('weightType') !== WeightType.ALLCAST}
                          />
                        </Form.Item>
                      </Col>
                      <Col>%计抛</Col>
                    </Row>
                  </Form.Item>
                </Radio>
                <Radio value={3}>
                  <Form.Item
                    className={styles.noExplain}
                    extra="若不免抛，计费重量=实重+(体积重-实重)*抛比"
                    help={<span>{null}</span>}
                  >
                    <Row align="middle" gutter={5}>
                      <Col>体积重/实重≤</Col>
                      <Col>
                        <Form.Item
                          noStyle
                          name="weightTypeDivideValue"
                          rules={[
                            {
                              required: getFieldValue('weightType') === WeightType.HALFCAST,
                              message: '请输入',
                            },
                          ]}
                        >
                          <InputNumber
                            min={1}
                            style={{ width: 60 }}
                            precision={0}
                            disabled={getFieldValue('weightType') !== WeightType.HALFCAST}
                          />
                        </Form.Item>
                      </Col>
                      <Col>%免抛，大于则按</Col>
                      <Col>
                        <Form.Item
                          name="castDivideRatio"
                          noStyle
                          rules={[
                            {
                              required: getFieldValue('weightType') === WeightType.HALFCAST,
                              message: '',
                            },
                          ]}
                        >
                          <InputNumber
                            min={0.01}
                            style={{ width: 60 }}
                            precision={2}
                            disabled={getFieldValue('weightType') !== WeightType.HALFCAST}
                          />
                        </Form.Item>
                      </Col>
                      <Col>%计抛</Col>
                    </Row>
                  </Form.Item>
                </Radio>
              </>
            );
          }}
        </Form.Item>
      </Radio.Group>
    </Form.Item>
  );
};

export default WeightTypeForm;
