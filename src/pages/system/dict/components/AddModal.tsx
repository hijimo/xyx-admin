import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Modal, message, Button, Skeleton } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import DictForm from './DictForm';
import type { DictAddParams } from '@/types';

import { addDict, editDict, getDictItemByCode } from '@/services/dict';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (dictCode?: number, dictType?: string) => void;
  hide: () => void;
}

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const queryClient = useQueryClient();
  const formRef = useRef<FormInstance>(null);

  const [visible, setVisible] = useState(false);
  const [dictCode, setDictCode] = useState<number>();
  const [dictType, setDictType] = useState<string>();
  const { data: dictInfo, isFetching } = useQuery(
    ['getDictItemByCode', { dictCode }],
    () => getDictItemByCode(dictCode!),
    {
      enabled: !!dictCode,
      select: (d) => d.data,
    },
  );

  useImperativeHandle(ref, () => ({
    show: (code, type) => {
      if (code) {
        setDictCode(code);
      }
      if (type) {
        setDictType(type);
      }

      setVisible(true);
    },
    hide: () => {
      setDictCode(undefined);
      setDictType(undefined);
      setVisible(false);
    },
  }));

  const isEdit = dictCode !== undefined;

  const initialValues = isEdit
    ? { ...dictInfo }
    : {
        dictType,
        dictSort: 1,
      };

  const { mutate, isLoading: addLoading } = useMutation(
    (values: DictAddParams) => (isEdit ? editDict(values) : addDict(values)),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(isEdit ? '修改成功' : '新增成功');
        queryClient.invalidateQueries(['getDictItemByCode', { dictCode }]);
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: DictAddParams) => {
      mutate(values);
    },
    [mutate],
  );

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      setDictCode(undefined);
      setDictType(undefined);
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  return (
    <Modal
      title={isEdit ? '编辑字典' : '新增字典'}
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
        <DictForm
          formRef={formRef}
          initialValues={initialValues}
          onFinish={handleFinish}
          autoComplete="off"
        />
      </Skeleton>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;
