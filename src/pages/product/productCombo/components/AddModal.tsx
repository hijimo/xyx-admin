import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, Descriptions, Alert, Select } from 'antd';
import _debounce from 'lodash/debounce';
import { StepsForm } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { ModalProps } from 'antd/es/modal';
import type { ComboPostData, ComboCpEditData, ComboCpPostData } from '@/types';
import EmptyWrap from '@/components/EmptyWrap';
import Upload from '@/components/Upload';
import RouteProductSelect from '@/pages/components/RouteProductSelect';
import { fetchComboCPList, addCombo, getComboDetail } from '@/services/combo';

import styles from './AddModal.less';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (id?: number) => void;
  hide: () => void;
}

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  const [visible, setVisible] = useState(false);

  const { mutate: getInfoMutate } = useMutation((id: number) => getComboDetail(id), {
    onSuccess: (responseData) => {
      const { id, comboName, cpCodeList, comboPic, comboCpDetails } = responseData.data;

      formMapRef.current[0]!.current?.setFieldsValue({
        id,
        comboName,
        cpCodeList,
        comboPic: [comboPic],
      });

      // 将当前的套餐配置信息预先放到第二个表单 以便后面比对确定价格等级下拉框的选中值
      formMapRef.current[1]!.current?.setFieldsValue({
        comboCpEditVoList: comboCpDetails,
      });
    },
  });

  const { mutateAsync } = useMutation((values: ComboPostData) => addCombo(values), {
    onSuccess: () => {
      const isEdit = formMapRef.current[0]?.current?.getFieldValue('id') !== undefined;
      setVisible(false);
      message.success(isEdit ? '修改成功' : '新增成功');
      onSuccess?.();
    },
  });

  const { mutateAsync: cpListMutateAsync } = useMutation(
    (cpCodeList: string[]) => fetchComboCPList(cpCodeList),
    {
      onSuccess: (responseData) => {
        // 获取表单上现有值，如果有的话
        // 把接口拿到的值和 现在值混合在一起，
        // 一、是为了编辑初始化的时候填补初始值
        // 二、是为了返回上一步的，再回到form.current[1]的时候保存之前设置的值。
        const oldData: ComboCpEditData[] =
          formMapRef.current[1]?.current?.getFieldValue('comboCpEditVoList');

        formMapRef.current[1]?.current?.setFieldsValue({
          comboCpEditVoList: responseData.data.map((it) => {
            const same = oldData?.find(
              (oit) => oit.cpCode === it.cpCode && oit.expenseItem === it.expenseItem,
            );
            let initialValue = undefined;
            if (same) {
              initialValue = same.priceLevel;
            } else if (it.priceLevelList.length > 0) {
              initialValue = it.priceLevelList[0]!.id;
            }
            return {
              ...it,
              priceLevel: initialValue,
            };
          }),
        });
      },
    },
  );

  useImperativeHandle(ref, () => ({
    show: (id) => {
      if (id) {
        getInfoMutate(id);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleStep1Finish = useCallback(
    async ({ cpCodeList }) => {
      const result = await cpListMutateAsync(cpCodeList);
      return result.success;
    },
    [cpListMutateAsync],
  );

  const handleSubmit = useCallback(
    async (values: any) => {
      const result = await mutateAsync({
        ...values,
        comboPic: values.comboPic[0],
      });
      return result.success;
    },
    [mutateAsync],
  );

  const showErrorMessage = useCallback(
    _debounce((msg: string) => {
      message.error(msg);
    }, 800),
    [],
  );

  return (
    <Modal
      title="添加"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      width={900}
      destroyOnClose
      footer={false}
      className={styles.modal}
    >
      <StepsForm formMapRef={formMapRef} onFinish={handleSubmit}>
        <StepsForm.StepForm
          name="step1"
          title="添加线路套餐"
          layout="horizontal"
          colon={false}
          onFinish={handleStep1Finish}
        >
          <Form.Item hidden name="id">
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="线路套餐名称"
            name="comboName"
            rules={[{ required: true, message: '请输入线路套餐名称' }]}
          >
            <Input placeholder="请输入线路套餐名称" allowClear />
          </Form.Item>
          <Form.Item
            label="选择线路"
            name="cpCodeList"
            rules={[{ required: true, message: '请选择线路' }]}
          >
            <RouteProductSelect labelInValue={false} selectByCpCode mode="multiple" />
          </Form.Item>
          <Form.Item
            label="套餐报价图"
            name="comboPic"
            valuePropName="fileList"
            rules={[{ required: true, message: '请上传套餐报价图', type: 'array' }]}
          >
            <Upload maxLength={1} />
          </Form.Item>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step2" title="价格等级设置" layout="horizontal" colon={false}>
          <Descriptions>
            <Descriptions.Item label="线路套餐名称" span={3}>
              <EmptyWrap value={formMapRef.current?.[0]?.current?.getFieldValue('comboName')} />
            </Descriptions.Item>
          </Descriptions>
          <Alert
            message="客户需绑定套餐才能使用线路，对其报价为套餐线路费用项对应等级的价格"
            type="warning"
            showIcon
          />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>线路</th>
                <th>费用项</th>
                <th>价格等级</th>
              </tr>
            </thead>
            <tbody>
              <Form.List
                name="comboCpEditVoList"
                rules={[
                  {
                    validator(rule, values) {
                      let f = false;
                      values.every((r: any) => {
                        f = r.priceLevel === undefined || r.firstPrice === null;
                        return !f;
                      });
                      if (f) {
                        showErrorMessage('请选择价格等级');
                        return Promise.reject(new Error('请选择价格等级'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                {(fields) => {
                  return fields.map((field, idx) => {
                    const row: ComboCpPostData =
                      formMapRef.current[1]?.current?.getFieldValue('comboCpEditVoList')[idx];
                    // 编辑状态下，从Detail接口拿到的数据中不包含 priceLevelList
                    const options = row.priceLevelList?.map((it) => ({
                      label: it.paramVal,
                      value: it.id,
                    }));
                    return (
                      <tr key={`comboCpEditVoList${field.key}`}>
                        <td>{row.cpName}</td>
                        <td>{row.expenseItemName}</td>
                        <td>
                          <Form.Item
                            {...field}
                            noStyle
                            validateFirst
                            name={[field.name, 'priceLevel']}
                            rules={[{ required: true, type: 'number', message: '请输入' }]}
                          >
                            <Select style={{ width: 120 }} options={options} placeholder="请选择" />
                          </Form.Item>
                        </td>
                      </tr>
                    );
                  });
                }}
              </Form.List>
            </tbody>
          </table>
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;
