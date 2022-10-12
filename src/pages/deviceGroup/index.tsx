import React, { useRef, useCallback, useState } from 'react';
import { message, Card, Modal } from 'antd';
import { useMutation } from 'react-query';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { FormInstance } from 'antd/es/form';
import type { AddDeviceGroupParams, DeviceGroupSSD } from '@/types';
import CompanySelect from '@/components/DataSelect/CompanySelect';
import DeviceGroupTree from '@/pages/components/DeviceGroupTree';
import type { RefDeviceGroupTreeProps } from '@/pages/components/DeviceGroupTree';
import { deleteDeviceGroup } from '@/services/deviceGroup';
import { isAdmin } from '@/utils/user';

import DeviceGroupForm from './components/DeviceGroupForm';
import styles from './index.less';

const WarningsIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddDeviceGroupParams>>(null);

  const treeRef = useRef<RefDeviceGroupTreeProps>(null);

  const [companyNo, setCompanyNo] = useState<string>();

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const reloadTreeData = () => {
    treeRef.current?.refetch();
  };

  const { mutate: deletetListItem } = useMutation((id: number) => deleteDeviceGroup(id), {
    onSuccess: () => {
      message.success('删除成功');
      reloadTreeData?.();
    },
  });

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    reloadTreeData();
  }, [history]);

  const handleNodeClick = useCallback((node) => {
    // setCurrentNode(node);

    setTimeout(() => {
      const { companyNo: initialCompanyNo, codePath, id, name } = node;
      formRef.current?.setFieldsValue({
        id,
        companyNo: initialCompanyNo,
        parentCode: codePath?.split(','),
        name,
      });
    }, 200);
  }, []);

  const handleDelete = useCallback((node: DeviceGroupSSD) => {
    Modal.confirm({
      title: '删除应用确认',
      content: `确认删除${node.name}？`,
      okText: '确认',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        deletetListItem(node.id);
      },
    });
  }, []);

  const handleInitial = useCallback((nodes) => {
    if (nodes && nodes.length > 0) {
      handleNodeClick(nodes[0]);
    }
  }, []);
  const handleAddChild = useCallback((node) => {
    // ;setCurrentNode(node)

    setTimeout(() => {
      const { companyNo: initialCompanyNo, codePath, code } = node;

      formRef.current?.setFieldsValue({
        id: undefined,
        name: undefined,
        companyNo: initialCompanyNo,
        parentCode: codePath && codePath.length > 0 ? [...codePath?.split(','), code] : [code],
      });
    }, 200);
  }, []);

  return (
    <PageContainer
      extra={
        <CompanySelect
          onChange={(v) => {
            setCompanyNo(v as string);
            reloadTreeData();
          }}
          value={companyNo}
          onDataReady={(dt) => {
            setCompanyNo(dt[0]?.companyNo);
          }}
          style={{ width: 300, visibility: isAdmin(currentUser) ? 'visible' : 'hidden' }}
        />
      }
    >
      <div className={styles.content}>
        <Card title={false} className={styles.treeCard}>
          <DeviceGroupTree
            ref={treeRef}
            companyNo={companyNo}
            defaultExpandAll
            onDataReady={handleInitial}
            onNodeClick={handleNodeClick}
            onItemAdd={handleAddChild}
            onItemDelete={handleDelete}
          />
        </Card>
        <Card className={styles.formCard}>
          <DeviceGroupForm
            companyNo={companyNo as string}
            formRef={formRef}
            onSuccess={handleSuccess}
          />
          {/* {currentNode ? (
            <DeviceGroupForm
              companyNo={companyNo as string}
              formRef={formRef}
              onSuccess={handleSuccess}
            />
          ) : (
            <div className={styles.h1}>请先选择要操作的分组树</div>
          )} */}
        </Card>
      </div>
    </PageContainer>
  );
};

export default WarningsIndex;
