import _split from 'lodash/split';
import { useCallback, useRef } from 'react';
import { useMutation } from 'react-query';
import { Button, message, Form, Card, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { FormInstance } from 'antd/es/form';
import { CompanyType } from '@/enum';
import type { EditPackageCustomerParams, PackageListItemSSD } from '@/types';
import MultiLineInput from '@/components/MultiLineInput';
import CompanySelect from '@/pages/components/CompanySelect';
import { editPackageCustomer } from '@/services/finance';

export interface RefEditPackageCustomerProps {
  show: (data?: PackageListItemSSD[]) => void;
  hide: () => void;
}

const EditPackageCustomer = () => {
  const formRef = useRef<FormInstance>(null);

  const { mutate, isLoading } = useMutation(
    (values: EditPackageCustomerParams) => editPackageCustomer(values),
    {
      onSuccess: () => {
        message.success('修改客户成功');
        formRef.current?.setFieldsValue({ waybillNoList: null, customerNo: null });
      },
    },
  );

  const handleFinish = useCallback(
    async (values: EditPackageCustomerParams) => {
      const params: EditPackageCustomerParams = {
        ...values,
        waybillNoList: _split(values.waybillNoList as string, ' '),
      };
      mutate(params);
    },
    [mutate],
  );

  return (
    <PageContainer>
      <Card>
        <Form ref={formRef} onFinish={handleFinish} size="large" autoComplete="off">
          <Row>
            <Col span={12}>
              <Form.Item
                label="运单号"
                name="waybillNoList"
                rules={[{ required: true, message: '请输入运单号' }]}
              >
                <MultiLineInput />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="客户"
                name="customerNo"
                rules={[{ required: true, message: '请选择客户' }]}
                extra="修改客户后，将对原客户生成相应冲红计费，并对修改后客户生成相应计费明细"
              >
                <CompanySelect
                  companyType={CompanyType.CUSTOMER}
                  bizType={2}
                  placeholder="请输入或选择"
                  valueType={'companyNo'}
                  allState={false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Button type="primary" loading={isLoading} htmlType="submit">
                提交
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default EditPackageCustomer;
