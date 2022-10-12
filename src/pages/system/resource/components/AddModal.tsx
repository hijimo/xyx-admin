import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Modal, message, Form, Input, Button, Skeleton, InputNumber, Switch } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { ResourceTypeList } from '@/enum';
import type { AddResourceParams } from '@/types';
import DefaultSelect from '@/components/DefaultSelect';

import { addResource, getResourceInfo } from '@/services/resource';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (parentId?: number, resourceId?: number) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const queryClient = useQueryClient();
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [parentId, setParentId] = useState<number>();
  const [resourceId, setResourceId] = useState<number>();

  const { data: resourceInfo, isFetching } = useQuery(
    ['resourceInfo', { resourceId }],
    () => getResourceInfo({ resourceId }),
    {
      enabled: !!resourceId,
      select: (d) => d.data,
    },
  );

  useImperativeHandle(ref, () => ({
    show: (parId, currId) => {
      if (parId) {
        setParentId(parId);
      } else {
        setParentId(undefined);
      }
      if (currId) {
        setResourceId(currId);
      } else {
        setResourceId(undefined);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const isEdit = resourceId !== undefined;

  const initialValues = isEdit
    ? { ...resourceInfo, extendFlag: resourceInfo?.extendFlag === 1 ? true : false }
    : { extendFlag: true };

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddResourceParams) => addResource(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(isEdit ? '修改成功' : '新增成功');
        queryClient.invalidateQueries(['resourceInfo', { resourceId }]);
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddResourceParams) => {
      const params: AddResourceParams = {
        ...values,
        parentId: parentId ?? 0,
        extendFlag: values.extendFlag ? 1 : 0,
      };
      mutate(params);
    },
    [mutate, parentId],
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
      title={isEdit ? '编辑资源' : '新增资源'}
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      footer={
        <>
          <Button type="default" onClick={() => setVisible(false)}>
            取消
          </Button>
          <Button type="primary" onClick={handleSubmit} loading={addLoading}>
            提交
          </Button>
        </>
      }
    >
      <Skeleton loading={isFetching}>
        <Form
          ref={formRef}
          initialValues={initialValues}
          onFinish={handleFinish}
          autoComplete="off"
          {...layout}
        >
          <Form.Item hidden name="resourceId">
            <Input placeholder="这是一个隐藏起来的表单域" />
          </Form.Item>
          <Form.Item
            label="资源名称"
            name="resourceName"
            rules={[{ required: true, message: '请填写资源名称' }]}
          >
            <Input maxLength={50} placeholder="请填写资源名称" allowClear />
          </Form.Item>
          <Form.Item
            label="资源key"
            name="resourceKey"
            rules={[{ required: true, message: '请填写资源key' }]}
          >
            <Input maxLength={50} placeholder="请填写资源key" allowClear />
          </Form.Item>
          <Form.Item
            label="资源类型"
            name="resourceType"
            rules={[{ required: true, message: '请选择资源类型' }]}
          >
            <DefaultSelect data={ResourceTypeList} />
          </Form.Item>
          <Form.Item label="资源地址" name="resourceUrl">
            <Input maxLength={200} placeholder="请填写资源地址" type="url" />
          </Form.Item>
          <Form.Item label="资源排序" name="orderNum">
            <InputNumber
              min={-128}
              max={127}
              placeholder="请填写资源排序（-128-127）"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label="可继承" name="extendFlag" valuePropName="checked">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;
