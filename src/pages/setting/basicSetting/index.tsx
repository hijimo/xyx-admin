import React, { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Form, message, Card, Skeleton } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { CurrencyTypeList } from '@/enum';
import type { SystemParams } from '@/types';
// import DefaultSelect from '@/components/DefaultSelect';
import { getSystemInfo, setSystemInfo } from '@/services/setting';
// import CustomerLevelTableList from './components/CustomerLevelTableList';
import TypeTags from './components/TypeTags';

const layout = {
  labelCol: { flex: '80px' },
};

const SystemIndex: React.FC = () => {
  const [form] = Form.useForm();

  const { data, isFetching, isSuccess } = useQuery(['systemInfo'], getSystemInfo, {
    select: (d) => d.data,
  });

  const initialValues = data;

  const { mutate } = useMutation((values: SystemParams) => setSystemInfo(values), {
    onSuccess: () => {
      message.success('保存成功');
    },
  });

  const onFinish = useCallback(
    (values: SystemParams) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <PageHeaderWrapper>
      <Card>
        <Skeleton loading={isFetching}>
          {isSuccess && (
            <>
              <Form
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
                size="large"
                {...layout}
              >
                <Form.Item label="费用项">
                  <TypeTags data={data?.billingItems || []} />
                </Form.Item>
                <Form.Item label="费用项等级">
                  <TypeTags data={data?.priceLevels || []} />
                </Form.Item>
                <Form.Item label="异常类型">
                  <TypeTags data={data?.abnormalTypes || []} />
                </Form.Item>
                <Form.Item label="轨迹节点">
                  <TypeTags data={data?.trackNodes || []} />
                </Form.Item>
                {/*  <Row justify="start">
                  <Space>
                    <Col>
                      <Form.Item
                        label="币种"
                        name="currencyType"
                        rules={[{ required: true, message: '请选择币种' }]}
                      >
                        <DefaultSelect
                          style={{ width: '300px' }}
                          data={CurrencyTypeList}
                          onChange={() => form.setFieldsValue({ exchangRate: null })}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label="汇率"
                        name="exchangRate"
                        rules={[{ required: true, message: '请输入汇率' }]}
                      >
                        <InputNumber
                          min={0}
                          precision={4}
                          placeholder="请输入汇率"
                          style={{ width: '300px' }}
                        />
                      </Form.Item>
                    </Col>
                  </Space>
                </Row>
                <Form.Item noStyle>
                  <Button type="primary" loading={addLoading} htmlType="submit">
                    保存
                  </Button>
                </Form.Item> */}
              </Form>
            </>
          )}
        </Skeleton>
      </Card>
    </PageHeaderWrapper>
  );
};

export default SystemIndex;
