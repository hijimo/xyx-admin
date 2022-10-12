import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { Modal, Input } from 'antd';
import { useMutation } from 'react-query';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { getCityDeviceList, searchDashboardDeviceByKeyword } from '@/services/dashboard';
import { getToken } from '@/utils/ls';
import type { CityDeviceListParams, DashboardSearchParams } from '@/types';
import { REFETCH_TIME } from '@/pages/dashboard/index';
import BMap from './BMap';
import styles from './MapModal.less';

interface MapModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {}

interface ShowData {
  coordinate: { lng: number; lat: number };
  code: string;
  name: string;
}
export interface RefMapModalProps {
  show: (dt: ShowData) => void;
  hide: () => void;
}

const InternalModal = (
  { onCancel, ...otherProps }: MapModalProps,
  ref: React.Ref<RefMapModalProps>,
) => {
  const cityNameRef = useRef<string>();
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [center, setCenter] = useState<{ lng: number; lat: number }>();

  const { mutate, data } = useMutation(
    (params: CityDeviceListParams) => getCityDeviceList(params),
    {
      onSuccess: (res) => {
        if (res.data.length) {
          setCenter({
            lng: res.data[0]?.longitude,
            lat: res.data[0]?.latitude,
          });
        }
      },
    },
  );
  const { mutate: searchMutate, data: searchData } = useMutation(
    (params: DashboardSearchParams) => searchDashboardDeviceByKeyword(params),
    {
      onSuccess: (res) => {
        if (res.data.length) {
          setCenter({
            lng: res.data[0]?.longitude,
            lat: res.data[0]?.latitude,
          });
        }
      },
    },
  );
  const token = getToken();

  useImperativeHandle(ref, () => ({
    show: ({ coordinate, code, name }) => {
      setCenter(coordinate);
      setVisible(true);
      cityNameRef.current = name;
      mutate({
        cityName: name,
        token,
      });
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

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  const handleSearch = useCallback((keyWords: string) => {
    console.log('keywords', keyWords);
    searchMutate({
      keyWords,
      token,
      cityName: cityNameRef.current,
    });
  }, []);

  return (
    <Modal
      className={styles.modal}
      footer={null}
      {...otherProps}
      visible={visible}
      width={1081}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
    >
      <Input.Search
        size="large"
        placeholder="请输入"
        onInput={() => {
          window.REFETCH_TIME = REFETCH_TIME;
        }}
        onSearch={handleSearch}
        className={styles.search}
      />
      <BMap center={center} data={searchData?.data || data?.data} />
    </Modal>
  );
};

const MapModal = React.forwardRef(InternalModal) as (
  props: MapModalProps & { ref?: React.Ref<RefMapModalProps> },
) => React.ReactElement;

export default MapModal;
