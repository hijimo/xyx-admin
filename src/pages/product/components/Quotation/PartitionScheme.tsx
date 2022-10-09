import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import type { FormInstance } from '@ant-design/pro-form';
import { produce } from 'immer';
import _remove from 'lodash/remove';
import YesNoStatusRadio from '@/pages/components/YesNoStatusRadio';
import type { PartitionData } from '@/types';
import { BooleanEnum } from '@/enum';
import PartitionModal from './PartitionModal';
import type { RefPartitionModalProps } from './PartitionModal';
import PartitionTable from './PartitionTable';
import type { PartitionTableData } from './PartitionTable';
import { expandPartitionData } from './utils';
import styles from './PartitionScheme.less';

interface PartitionSchemeProps {
  formRef?: React.MutableRefObject<FormInstance<any> | undefined>;
  readonly?: boolean;
  tableData?: PartitionTableData[];
}

const PartitionScheme: React.FC<PartitionSchemeProps> = ({ formRef, tableData, readonly }) => {
  const modalRef = useRef<RefPartitionModalProps>(null);
  const [dataSource, setDataSource] = useState<PartitionTableData[]>([]);

  useEffect(() => {
    setDataSource(tableData || []);
  }, [tableData]);

  const handleAdd = useCallback(() => {
    modalRef.current?.show();
  }, [modalRef]);

  const handleDelete = useCallback(
    (item) => {
      const result = produce(dataSource, (draft) => {
        const deleteArray = draft.filter((it) => {
          return it.partitionCode === item.partitionCode;
        });
        (deleteArray || []).forEach((it) => {
          const idx = draft.findIndex((iit) => iit.partitionCode === it.partitionCode);
          if (idx >= 0) {
            draft.splice(idx, 1);
          }
        });
      });
      setDataSource(result);
      formRef?.current?.setFieldsValue({
        partitionList: [...result],
      });
    },
    [dataSource, formRef],
  );
  const handleEdit = useCallback((item: PartitionData) => {
    modalRef.current?.show(item);
  }, []);

  const handleSubmit = useCallback(
    (values: PartitionData) => {
      let result = [];

      const idx = dataSource.findIndex((it) => it.partitionCode === values.partitionCode);
      if (idx >= 0) {
        _remove(dataSource, (o) => o.partitionCode === values.partitionCode);
        dataSource.splice(idx, 0, ...expandPartitionData(values));
        result = [...dataSource];
      } else {
        result = [...dataSource, ...expandPartitionData(values)];
      }

      setDataSource(result);

      formRef?.current?.setFieldsValue({
        partitionList: [...result],
      });
    },
    [dataSource, formRef],
  );

  return (
    <>
      <Form.Item
        label="所有区域一口价"
        rules={[{ required: true, message: '请选择是否所有区域一口价' }]}
        name="defaultPriceFlag"
      >
        <YesNoStatusRadio disabled={readonly} />
      </Form.Item>
      <Form.Item label="productId" hidden name="productId">
        <Input />
      </Form.Item>
      <Form.Item label="offerType" hidden name="offerType">
        <Input />
      </Form.Item>
      <Form.Item label="productType" hidden name="productType">
        <Input />
      </Form.Item>
      <Form.Item label="offerId" hidden name="offerId">
        <Input />
      </Form.Item>
      <Form.Item dependencies={['defaultPriceFlag']}>
        {({ getFieldValue }) =>
          getFieldValue('defaultPriceFlag') === BooleanEnum.FALSE ? (
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="分区方案名称"
                    rules={[{ required: true, message: '请输入分区方案名称' }]}
                    name="projectName"
                  >
                    <Input placeholder="请输入分区方案名称" disabled={readonly} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="分区列表" required>
                {readonly !== true && (
                  <Button onClick={handleAdd} type="primary">
                    添加分区
                  </Button>
                )}

                {/* 用来显示error信息 */}
                <Form.Item
                  className={styles.h0}
                  name="partitionList"
                  rules={[{ required: true, type: 'array', message: '请添加分区' }]}
                >
                  <Input />
                </Form.Item>
                <PartitionTable
                  readonly={readonly}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  className={styles.table}
                  dataSource={dataSource}
                />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
      <PartitionModal ref={modalRef} onSubmit={handleSubmit} />
    </>
  );
};

export default PartitionScheme;
