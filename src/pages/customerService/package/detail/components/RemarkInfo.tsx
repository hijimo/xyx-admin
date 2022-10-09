import _values from 'lodash/values';
import { useRef, useCallback } from 'react';
import { Button } from 'antd';
import CommonTable from '@/components/CommonTable';
import type { PackageDetailSSD } from '@/types';
import { remarkColumns } from '@/pages/configurify/columns';
import RemarkInfoModal from './AddRemarkModal';
import type { RefAddRemarkModalProps } from './AddRemarkModal';

interface RemarkInfoProps {
  data?: PackageDetailSSD;
  onSuccess: () => void;
}

const columns = _values(remarkColumns);

const RemarkInfo = ({ data, onSuccess }: RemarkInfoProps) => {
  const rremarkInfoModalRef = useRef<RefAddRemarkModalProps>(null);

  const handleRemark = useCallback(() => {
    rremarkInfoModalRef.current?.show();
  }, [rremarkInfoModalRef]);

  const toolBarRender: any = useCallback(() => {
    return (
      <>
        <Button type="primary" onClick={handleRemark} key="remark">
          添加备注
        </Button>
      </>
    );
  }, [handleRemark]);

  return (
    <>
      <CommonTable
        dataSource={data?.remarkDtos || []}
        columns={columns}
        rowKey="id"
        search={false}
        pagination={false}
        toolBarRender={toolBarRender}
        options={false}
      />
      <RemarkInfoModal ref={rremarkInfoModalRef} onSuccess={onSuccess} uniqueNo={data?.uniqueNo} />
    </>
  );
};

export default RemarkInfo;
