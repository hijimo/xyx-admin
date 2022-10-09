import React, { useCallback, useImperativeHandle, useState } from 'react';
import { Modal, Descriptions } from 'antd';
import type { ModalProps } from 'antd';
import _isNil from 'lodash/isNil';
import EmptyWrap from '@/components/EmptyWrap';
import type { ResponseData } from '@/utils/request';
import type { QuoteResponseData, CompanyBillListSSD } from '@/types';
import QuoteTableDetail from '@/pages/components/QuoteTableDetail';

interface QuoteModalProps extends Omit<ModalProps, 'visible' | 'onCancel'> {
  getOfferDetail?: (id: number | string) => Promise<ResponseData<QuoteResponseData>>;
  showQuoteNo?: boolean;
}

export interface RefQuoteModalProps {
  show: (id?: CompanyBillListSSD) => void;
  hide: () => void;
}

const InternalQuoteModalProps = (
  { getOfferDetail, showQuoteNo = true, ...props }: QuoteModalProps,
  ref: React.Ref<RefQuoteModalProps>,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<CompanyBillListSSD | undefined>();

  useImperativeHandle(ref, () => ({
    show: (i) => {
      setRecord(i);
      setVisible(true);
    },
    hide: () => {},
  }));

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Modal
      title="报价快照"
      width={800}
      cancelText="关闭"
      {...props}
      okButtonProps={{
        style: {
          display: 'none',
        },
      }}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
    >
      {showQuoteNo && (
        <div style={{ marginBottom: '24px' }}>
          报价编号：
          <EmptyWrap value={record?.offerNo} />
        </div>
      )}

      {!_isNil(record?.otherFormula) && (
        <Descriptions column={1}>
          <Descriptions.Item label="公式">{record?.otherFormula}</Descriptions.Item>
        </Descriptions>
      )}
      {record?.id !== undefined && _isNil(record?.otherFormula) && (
        <QuoteTableDetail
          id={record?.id}
          getOfferDetail={getOfferDetail}
          showQuoteNo={showQuoteNo}
        />
      )}
    </Modal>
  );
};
const QuoteModal = React.forwardRef(InternalQuoteModalProps) as (
  props: QuoteModalProps & { ref?: React.Ref<RefQuoteModalProps> },
) => React.ReactElement;

export default QuoteModal;
