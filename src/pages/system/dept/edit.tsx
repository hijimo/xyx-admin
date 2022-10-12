import React, { useRef, useCallback, useMemo, useState } from 'react';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams, useLocation } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import type { AddDeptParams, DeptSSD } from '@/types';
import type { Location } from 'umi';
import { getDeptInfo } from '@/services/dept';

import DeptForm from './components/DeptForm';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddDeptParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();
  const location: Location = useLocation();
  const { isAddChild } = location.query || {};
  const isAddChildMode = isAddChild === '1';
  //

  const [isRootDept, setIsRootDept] = useState<boolean>(false);

  const { data } = useQuery(['deptInfo', id], () => getDeptInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
    onSuccess: (d: DeptSSD) => {
      if (d.deptPath === null) {
        setIsRootDept(true);
      }
    },
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;

    const values: any = {
      ...data,
      deptNoPath: data.deptPath?.split(','),
    };
    if (isAddChildMode) {
      const { deptNo, deptNoPath, companyNo, id: deptId } = values;
      return {
        companyNo,
        deptNo,
        parentId: deptId,
        // 顶级部门节点不存在deptNoPath
        deptNoPath: deptNoPath ? [...deptNoPath, deptNo] : [deptNo],
      };
    }
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['deptInfo', id]);
    history.replace('/system/dept');
  }, [history]);

  const handleCancel = useCallback(() => {
    history.goBack();
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, []);

  return (
    <PageContainer
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          提交
        </Button>,
      ]}
    >
      <Card>
        {initialValues !== undefined && (
          <DeptForm
            // 添加子模式情况下，不禁用上级组织
            isRootDept={isRootDept && !isAddChild}
            formRef={formRef}
            onSuccess={handleSuccess}
            initialValues={initialValues}
          />
        )}
      </Card>
    </PageContainer>
  );
};

export default EditIndex;
