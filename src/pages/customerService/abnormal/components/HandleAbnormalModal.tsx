import _find from 'lodash/find';
import _every from 'lodash/every';
import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, Radio } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { BooleanEnum, ResultType } from '@/enum';
import type {
  PackageAbnormalParams,
  PackageAbnormalListItemSSD,
  TabStatisticsItemSSD,
} from '@/types';
import Upload from '@/components/Upload';
import AbnormalPackageRouteSelect from '@/pages/components/AbnormalPackageRouteSelect';
import BillNoInfo from '@/pages/components/BillNoInfo';
import { packageAbnormalHandle } from '@/services/package';

interface HandleAbnormalModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess?: () => void;
  tab?: TabStatisticsItemSSD;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface RefHandleAbnormalModalProps {
  show: (rows: PackageAbnormalListItemSSD[]) => void;
  hide: () => void;
}

const InternalHandleAbnormalModal = (
  { onCancel, onSuccess, tab, ...otherProps }: HandleAbnormalModalProps,
  ref: React.Ref<RefHandleAbnormalModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [billNoList, setBillNoList] = useState<PackageAbnormalListItemSSD[]>([]);

  useImperativeHandle(ref, () => ({
    show: (rows) => {
      setBillNoList(rows);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const formatParams = useMemo(() => {
    return {
      isAllHaveSameWaybillNo: _every(
        billNoList,
        (row) => row.waybillNo === billNoList[0]?.waybillNo,
      ),
    };
  }, [billNoList]);

  const { mutate, isLoading: addLoading } = useMutation(
    (values: PackageAbnormalParams) => packageAbnormalHandle(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('提交成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (
      values: PackageAbnormalParams & {
        lineNo: { key: string; label: string; value: string };
      },
    ) => {
      const { lineNo } = values;
      const params: PackageAbnormalParams = {
        ...values,
        lineNo: lineNo && lineNo?.value,
        idList: billNoList.map((item) => item.id),
      };
      mutate(params);
    },
    [mutate, billNoList],
  );

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  return (
    <Modal
      title="处理异常"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <BillNoInfo data={billNoList?.map((item) => item.uniqueNo) || []} />
      <Form
        {...layout}
        ref={formRef}
        onFinish={handleFinish}
        initialValues={{
          resultType: ResultType.REJECT,
          lineFlag: 0,
        }}
      >
        <Form.Item label="处理结果" name="resultType" rules={[{ required: true }]}>
          <Radio.Group
            onChange={() => formRef.current?.setFieldsValue({ changeFlag: 0, lineId: undefined })}
          >
            <Radio value={ResultType.REJECT}>退回</Radio>
            <Radio value={ResultType.CONTINUE}>放行</Radio>
            {tab?.value === 1 ? (
              <Radio value={ResultType.PLATFORM}>需平台确认</Radio>
            ) : (
              <Radio value={ResultType.CUSTOMER}>需客户确认</Radio>
            )}
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle dependencies={['resultType']}>
          {({ getFieldValue }) =>
            getFieldValue('resultType') === ResultType.CONTINUE && (
              <Form.Item
                label="是否更换线路"
                name="changeFlag"
                rules={[{ required: true }]}
                extra="批量处理异常时不能更换线路"
              >
                <Radio.Group>
                  <Radio value={0}>否</Radio>
                  <Radio
                    value={1}
                    disabled={
                      !formatParams.isAllHaveSameWaybillNo || !billNoList?.[0]?.customerName
                    }
                  >
                    是
                  </Radio>
                </Radio.Group>
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item noStyle dependencies={['changeFlag']}>
          {({ getFieldValue, setFieldsValue }) =>
            getFieldValue('changeFlag') === BooleanEnum.TRUE && (
              <Form.Item
                label="选择线路"
                name="cpId"
                rules={[{ required: true, message: '请选择线路' }]}
              >
                <AbnormalPackageRouteSelect
                  uniqueNo={billNoList?.[0]?.uniqueNo}
                  onDataReady={(data) => {
                    const cpId = billNoList?.[0]?.cpId;
                    setFieldsValue({
                      cpId: cpId
                        ? cpId
                        : _find(data, (item) => item.sameFlag === BooleanEnum.TRUE)?.id ??
                          undefined,
                    });
                  }}
                />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item noStyle dependencies={['resultType']}>
          {({ getFieldValue }) => (
            <Form.Item
              label="备注"
              name="handleRemark"
              rules={[
                {
                  required: getFieldValue('resultType') === ResultType.PLATFORM,
                  message: '请输入备注',
                },
              ]}
            >
              <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
            </Form.Item>
          )}
        </Form.Item>
        {tab?.value === 3 && (
          <Form.Item label="附件" name="handleFileList">
            <Upload maxLength={3} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

const HandleAbnormalModal = React.forwardRef(InternalHandleAbnormalModal) as (
  props: HandleAbnormalModalProps & { ref?: React.Ref<RefHandleAbnormalModalProps> },
) => React.ReactElement;

export default HandleAbnormalModal;
