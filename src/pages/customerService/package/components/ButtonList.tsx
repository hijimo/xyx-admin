import _every from 'lodash/every';
import _some from 'lodash/some';
import _isNil from 'lodash/isNil';
import _filter from 'lodash/filter';
import { useRef, useMemo, useCallback } from 'react';
import { useMutation } from 'react-query';
import { Button, message, Menu, Dropdown, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ButtonType } from 'antd/es/button';
import type { PackageListItemSSD, PackageDetailSSD } from '@/types';
import { BooleanEnum, PackageState } from '@/enum';
import { deletePackage } from '@/services/package';
import BillNoInfo from '@/pages/components/BillNoInfo';
import EditRouteProductModal from './EditRouteProductModal';
import EditCountryModal from './EditCountryModal';
import EditGoodsInfoModal from './EditGoodsInfoModal';
import EditOrderNoModal from './EditOrderNoModal';
import EditReceiverInfoModal from './EditReceiverInfoModal';
import FastenerModal from './FastenerModal';
import type { RefEditRouteProductModalProps } from './EditRouteProductModal';
import type { RefEditCountryModalProps } from './EditCountryModal';
import type { RefEditGoodsInfoModalProps } from './EditGoodsInfoModal';
import type { RefEditReceiverInfoModalProps } from './EditReceiverInfoModal';
import type { RefEditOrderNoModalProps } from './EditOrderNoModal';
import type { RefFastenerModalProps } from './FastenerModal';

interface ButtonListType {
  name: string;
  key: string;
  type: ButtonType;
  ref?: any;
}

interface BasicInfoProps {
  onSuccess: () => void;
  selectedRows: (PackageListItemSSD | PackageDetailSSD)[];
  ellipsis?: boolean;
  disabled?: boolean;
}

const { confirm } = Modal;

const ButtonList = ({ onSuccess, selectedRows, ellipsis, disabled }: BasicInfoProps) => {
  const editRouteProductModalRef = useRef<RefEditRouteProductModalProps>(null);
  const editCountryModalRef = useRef<RefEditCountryModalProps>(null);
  const editGoodsInfoModalRef = useRef<RefEditGoodsInfoModalProps>(null);
  const editReceiverInfoModalRef = useRef<RefEditReceiverInfoModalProps>(null);
  const editOrderNoModalRef = useRef<RefEditOrderNoModalProps>(null);
  const fastenerModalRef = useRef<RefFastenerModalProps>(null);

  const { TOSTORAGE, INSTORAGE, REJECT, SENDBACK, TOREPLACE, VOIDED, CANCEL } = PackageState;

  const { mutate } = useMutation((values: { idList: number[] }) => deletePackage(values), {
    onSuccess: () => {
      message.success('废弃成功');
      onSuccess();
    },
  });

  const handleDelete = useCallback(
    (rows: PackageListItemSSD[]) => {
      confirm({
        title: '确定废弃选中的包裹吗？',
        icon: <ExclamationCircleOutlined />,
        onOk() {
          mutate({ idList: rows?.map((item) => item.id) });
        },
      });
    },
    [mutate],
  );

  const buttons: ButtonListType[] = useMemo(
    () => [
      { name: '修改目的国', key: 'editCountry', type: 'default', ref: editCountryModalRef },
      /*  {
        name: '修改线路产品',
        key: 'editRouteProduct',
        type: 'default',
        ref: editRouteProductModalRef,
      }, */
      {
        name: '修改收件人信息',
        key: 'editReceiverInfo',
        type: 'default',
        ref: editReceiverInfoModalRef,
      },
      { name: '修改商品信息', key: 'editGoodsInfo', type: 'default', ref: editGoodsInfoModalRef },
      { name: '修改原始单号', key: 'editOrderNo', type: 'default', ref: editOrderNoModalRef },
      /* {
        name: '废弃',
        key: 'delete',
        type: 'primary',
      }, */
      { name: '扣件', key: 'fastener', type: 'primary', ref: fastenerModalRef },
    ],
    [
      editCountryModalRef,
      // editRouteProductModalRef,
      editReceiverInfoModalRef,
      editGoodsInfoModalRef,
      editOrderNoModalRef,
      fastenerModalRef,
    ],
  );

  const formatParams = useMemo(() => {
    return {
      isAllHaveSameCustomer: _every(
        selectedRows,
        (row) => row.customerName === selectedRows[0]?.customerName && !_isNil(row.customerName),
      ),
      isAllHaveSameCountry: _every(
        selectedRows,
        (row) => row.countryId === selectedRows[0]?.countryId,
      ),
      isAllEditState: _every(selectedRows, (row) =>
        _some([TOSTORAGE, INSTORAGE], (item) => item === row.state),
      ),
      isAllFastenerState: _every(selectedRows, (row) =>
        _every([REJECT, SENDBACK, TOREPLACE, VOIDED, CANCEL], (item) => item !== row.state),
      ),
      isAllCanDelete: _every(selectedRows, (row) =>
        _some(
          [TOREPLACE, TOSTORAGE, INSTORAGE, REJECT],
          (item) => item === row.state && row.abnormalFlag === BooleanEnum.FALSE,
        ),
      ),
      isAllHaveSameWaybillNo: _every(
        selectedRows,
        (row) => row.waybillNo === selectedRows[0]?.waybillNo,
      ),
      isAllAbnormal: _every(selectedRows, (row) => row.abnormalFlag === BooleanEnum.TRUE),
      hasAbnormal: _some(selectedRows, (row) => row.abnormalFlag === BooleanEnum.TRUE),
      isAllHaveCountry: _every(selectedRows, (row) => row.countryId),
      isHasCustomerName: !!selectedRows[0]?.customerName,
    };
  }, [selectedRows, TOSTORAGE, INSTORAGE, REJECT, SENDBACK, TOREPLACE, VOIDED, CANCEL]);

  const filterBillNoList = useCallback(
    (typeList: number[], equalsState: boolean = true) => {
      return selectedRows
        .filter(
          (item) =>
            (equalsState
              ? _some(typeList, (i) => i === item.state)
              : _every(typeList, (i) => i !== item.state)) && item,
        )
        .map((k) => k.uniqueNo);
    },
    [selectedRows],
  );

  const handleClick = useCallback(
    (item: ButtonListType) => {
      if (item.key !== 'fastener' && !formatParams.isAllAbnormal && item.key !== 'delete') {
        message.error('请选择已标记异常的包裹进行修改');
        return;
      }
      if (item.key === 'fastener') {
        if (formatParams.hasAbnormal) {
          message.error('存在异常包裹，请重新选择');
          return;
        }
        if (!formatParams.isAllFastenerState) {
          message.error(
            <BillNoInfo
              data={filterBillNoList([REJECT, SENDBACK, TOREPLACE, VOIDED, CANCEL])}
              suffix="包裹状态不支持扣件"
              isAlert={false}
            />,
          );
          return;
        }
      }
      if (!formatParams.isAllEditState && item.key !== 'fastener' && item.key !== 'delete') {
        message.error(
          <BillNoInfo
            data={filterBillNoList([INSTORAGE, TOSTORAGE], false)}
            suffix="包裹状态不支持修改"
            isAlert={false}
          />,
        );
        return;
      }
      if (item.key === 'editOrderNo' && selectedRows?.length > 1) {
        message.error('该操作不支持批量操作');
        return;
      }
      if (item.key === 'editReceiverInfo' && !formatParams.isAllHaveCountry) {
        message.error('存在没有目的国的包裹，不能编辑收件人信息');
        return;
      }
      if (item.key === 'editReceiverInfo' && !formatParams.isAllHaveSameCountry) {
        message.error('收件人国家不同，不能编辑收件人信息');
        return;
      }
      if (item.key === 'delete') {
        if (formatParams.isAllCanDelete) {
          handleDelete(selectedRows);
        } else {
          message.error('只能废弃非异常的待入库包裹和非异常的已入库包裹');
          return;
        }
      } else {
        item.ref.current?.show(selectedRows);
      }
    },
    [
      selectedRows,
      handleDelete,
      filterBillNoList,
      REJECT,
      SENDBACK,
      TOREPLACE,
      VOIDED,
      CANCEL,
      INSTORAGE,
      TOSTORAGE,
      formatParams,
    ],
  );

  const menuButton = useMemo(() => {
    const menuList = _filter(buttons, (item, index) => index > 1 && item) as ButtonListType[];
    return (
      <Menu>
        {menuList!.map((item: ButtonListType) => (
          <Menu.Item onClick={() => handleClick(item)} key={item.key}>
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [buttons, handleClick]);

  return (
    <>
      {ellipsis ? (
        <Space>
          <Button
            onClick={() => handleClick(buttons[0]!)}
            key={buttons[0]?.key}
            type={buttons[0]?.type}
            disabled={disabled || !formatParams.isAllEditState}
          >
            {buttons[0]!.name}
          </Button>
          <Dropdown.Button
            disabled={disabled || !formatParams.isAllEditState}
            key={buttons[1]?.key}
            onClick={() => handleClick(buttons[1]!)}
            overlay={menuButton}
          >
            {buttons[1]!.name}
          </Dropdown.Button>
          {/*   <Button
            onClick={() => handleClick(buttons[5])}
            key={buttons[5]?.key}
            type={buttons[5]?.type}
            disabled={
              selectedRows?.length === 0 ||
              selectedRows[0]?.abnormalFlag === 1 ||
              !formatParams.isAllFastenerState
            }
          >
            {buttons[5]!.name}
          </Button> */}
        </Space>
      ) : (
        <Space size={16}>
          {buttons.map((item: ButtonListType) => (
            <Button
              onClick={() => handleClick(item)}
              key={item.key}
              disabled={disabled}
              type={item?.type}
            >
              {item.name}
            </Button>
          ))}
        </Space>
      )}
      <EditRouteProductModal ref={editRouteProductModalRef} onSuccess={onSuccess} />
      <EditCountryModal ref={editCountryModalRef} onSuccess={onSuccess} />
      <EditGoodsInfoModal ref={editGoodsInfoModalRef} onSuccess={onSuccess} />
      <EditOrderNoModal ref={editOrderNoModalRef} onSuccess={onSuccess} />
      <EditReceiverInfoModal ref={editReceiverInfoModalRef} onSuccess={onSuccess} />
      <FastenerModal
        ref={fastenerModalRef}
        onSuccess={onSuccess}
        editRouteProduct={
          formatParams.isAllHaveSameCustomer &&
          formatParams.isAllHaveSameCountry &&
          formatParams.isAllHaveSameWaybillNo &&
          formatParams.isHasCustomerName
        }
      />
    </>
  );
};

export default ButtonList;
