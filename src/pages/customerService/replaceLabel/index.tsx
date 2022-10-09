import React, { useCallback, useRef } from 'react';
import type { InputRef, FormInstance } from 'antd';
import { Form, Input, Row, Col, message, Card, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useMutation } from 'react-query';
import request from 'umi-request';
import type { ElectronicLabelParams } from '@/types';
import { ElectronicLabelType } from '@/enum';
import { replacePackageWaybill, getElectronicLabel } from '@/services/operation';
import { printPDF } from '@/utils/helper';

export interface ReplaceLabelProps {}

const ReplaceLabel: React.FC<ReplaceLabelProps> = () => {
  const packageInputRef = useRef<InputRef>(null);
  const formRef = useRef<FormInstance>(null);

  const { mutate, isLoading } = useMutation((values: string) => replacePackageWaybill(values), {
    onSuccess: (data) => {
      formRef.current?.setFieldsValue({
        waybillNo: data.data,
      });
      packageInputRef.current?.focus({ cursor: 'all' });
    },
    onError: () => {
      packageInputRef.current?.focus({ cursor: 'all' });
    },
  });

  const { mutate: printMutate, isLoading: printLoading } = useMutation(
    (values: ElectronicLabelParams) => getElectronicLabel(values),
    {
      onSuccess: async ({ data }) => {
        if (data && data.length > 0) {
          const electronicBills = data.map((d) => {
            if (d.type === ElectronicLabelType.BASE64) {
              return d.data;
            }
            if (d.type === ElectronicLabelType.LINK) {
              return request
                .get(d.data, { responseType: 'arrayBuffer' })
                .catch(() => Promise.reject(new Error(`有电子面单获取失败!`)));
            }
            return Promise.reject(new Error(`有电子面单不支持打印!`));
          });

          try {
            const result = await Promise.all(electronicBills);
            printPDF(result);
            formRef.current?.setFieldsValue({
              oldWaybillNo: undefined,
              waybillNo: undefined,
            });
            packageInputRef.current?.focus({ cursor: 'all' });
          } catch (error: any) {
            message.error(error?.message);
          }
        } else {
          message.error('接口未返回可打印数据');
        }
      },
      onError: () => {
        packageInputRef.current?.focus({ cursor: 'all' });
      },
    },
  );

  const getNewWaybillNo = useCallback(() => {
    const oldWaybillNo = formRef.current?.getFieldValue('oldWaybillNo');
    if (oldWaybillNo) {
      mutate(oldWaybillNo);
    } else {
      message.error('原运单号为空');
      packageInputRef.current?.focus({ cursor: 'all' });
    }
  }, [mutate, formRef, packageInputRef]);

  const printLabel = useCallback(() => {
    const waybillNo = formRef.current?.getFieldValue('waybillNo');
    if (waybillNo) {
      printMutate({
        waybillNo: [waybillNo],
      });
    } else {
      message.error('新运单号为空');
      packageInputRef.current?.focus({ cursor: 'all' });
    }
  }, [printMutate, formRef, packageInputRef]);

  return (
    <PageHeaderWrapper>
      <Card title="更换面单">
        <Form ref={formRef} size="large" autoComplete="off">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="原运单号"
                name="oldWaybillNo"
                rules={[{ required: true, message: '原运单号不能为空', type: 'string' }]}
              >
                <Input ref={packageInputRef} autoFocus placeholder="请扫描原运单号" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="新运单号"
                name="waybillNo"
                rules={[{ required: true, message: '新运单号不能为空', type: 'string' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button type="primary" loading={isLoading} onClick={getNewWaybillNo}>
                获取新运单号
              </Button>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Button loading={printLoading} onClick={printLabel}>
                打印电子面单
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default ReplaceLabel;
