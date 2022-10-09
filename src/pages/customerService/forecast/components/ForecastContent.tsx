import _every from 'lodash/every';
import React from 'react';
import { Card, Form, Radio, Row, Col } from 'antd';
import { CompanyType } from '@/enum';
import CompanySelect from '@/pages/components/CompanySelect';
import DraggerUpload from './DraggerUpload';

const templateList = [
  {
    href: 'https://image.alltopbuy.com/default/template/小包标准模版(kpost).xlsx',
    name: '常规预报模板.xslx',
    key: 1,
  },
  {
    href: 'https://image.alltopbuy.com/default/template/极简预报模板.xlsx',
    name: '极简预报模板.xlsx',
    key: 2,
  },
  {
    href: 'https://image.alltopbuy.com/default/template/包裹资料补录模板.xlsx',
    name: '包裹信息补充模板.xlsx',
    key: 3,
  },
  {
    href: 'https://image.alltopbuy.com/default/template/纸转电批量导入模板.xlsx',
    name: '纸转电预报模板.xlsx',
    key: 4,
  },
  /* {
    href: 'https://image.alltopbuy.com/default/template/菜鸟干线导入模版.xlsx',
    name: '菜鸟干线模板.xlsx',
    key: 5,
  }, */
];

export interface ForecastContentProps {}

const ForecastContent: React.FC<ForecastContentProps> = () => {
  const [form] = Form.useForm();

  return (
    <Card>
      <Form form={form} initialValues={{ forecastType: 1 }}>
        <Row>
          <Col flex={1}>
            <Form.Item label="预报类型" name="forecastType" rules={[{ required: true }]}>
              <Radio.Group onChange={() => form.setFieldsValue({ customerId: undefined })}>
                <Radio value={1}>常规预报</Radio>
                <Radio value={2}>极简预报</Radio>
                <Radio value={3}>包裹信息补充</Radio>
                <Radio value={4}>纸转电预报</Radio>
                {/* <Radio value={5}>菜鸟干线</Radio> */}
              </Radio.Group>
            </Form.Item>

            <Form.Item noStyle dependencies={['forecastType']}>
              {({ getFieldValue }) =>
                _every([3, 4, 5], (item) => item !== getFieldValue('forecastType')) ? (
                  <Form.Item
                    label="客户"
                    name="customerId"
                    rules={[{ required: true, message: '请选择客户' }]}
                  >
                    <CompanySelect
                      allState={false}
                      style={{ width: 300 }}
                      companyType={CompanyType.CUSTOMER}
                      bizType={2}
                      placeholder="请输入或选择"
                    />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
          <Col style={{ width: 180 }}>
            <Row>
              <Col span={24}>下载模板：</Col>
              {templateList.map((item) => (
                <Col span={24} key={item.key}>
                  <a target="_blank" rel="noreferrer" href={item.href} download={item.name}>
                    {item.name}
                  </a>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Form.Item noStyle dependencies={['customerId', 'forecastType']}>
          {({ getFieldValue }) => (
            <DraggerUpload
              key={getFieldValue('forecastType')}
              customerId={getFieldValue('customerId')}
              forecastType={getFieldValue('forecastType')}
            />
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForecastContent;
