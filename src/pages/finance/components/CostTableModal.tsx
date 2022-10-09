import React, { useCallback, useImperativeHandle, useState, useMemo } from 'react';
import { Modal, Table } from 'antd';
import _values from 'lodash/values';
import { produce } from 'immer';
import { financeCostColumns } from '@/pages/configurify/columns';

const tableColumns = financeCostColumns;

interface CostTableModalProps {}
export interface RefCostTableModalProps {
  show: (id?: number) => void;
  hide: () => void;
}

const InternalCostTableModalProps = (
  props: CostTableModalProps,
  ref: React.Ref<RefCostTableModalProps>,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>();

  console.log(id);
  useImperativeHandle(ref, () => ({
    show: (i) => {
      setId(i);
      setVisible(true);
    },
    hide: () => {},
  }));

  const handleOk = useCallback(() => {
    setVisible(false);
  }, []);
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        console.log(draft);
        // draft.companyNo!.initialValue = initialValueNo;
        // draft.option!.render = (_, item) => {
        //   return (
        //     <>
        //       <a onClick={() => handleDetail(item.id)}>明细</a>
        //       <Divider type="vertical" />
        //       <a onClick={() => handleSend(item.id)}>发送</a>
        //     </>
        //   );
        // };
      }),
    );
  }, []);

  return (
    <Modal
      title="成本明细"
      onOk={handleOk}
      width={900}
      okButtonProps={{
        hidden: true,
      }}
      cancelButtonProps={{
        hidden: true,
      }}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
    >
      <Table columns={columns} />
    </Modal>
  );
};
const CostTableModal = React.forwardRef(InternalCostTableModalProps) as (
  props: CostTableModalProps & { ref?: React.Ref<RefCostTableModalProps> },
) => React.ReactElement;

export default CostTableModal;
