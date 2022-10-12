import React, { useRef, useCallback, useMemo } from 'react';
import moment from 'moment';
import _isNil from 'lodash/isNil';
import _first from 'lodash/first';
import { Card, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory, useParams } from 'umi';
import { useQuery, useQueryClient } from 'react-query';
import type { FormInstance } from 'antd/es/form';
import type { AddUserParams } from '@/types';
import { getUserInfo } from '@/services/userManager';
import UserForm from './components/UserForm';

const EditIndex: React.FC = () => {
  const formRef = useRef<FormInstance<AddUserParams>>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['userInfo', id], () => getUserInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    let deptPath = undefined;
    if (data.deptDto?.deptPath) {
      deptPath = [...data.deptDto.deptPath?.split(','), data.deptDto.deptNo];
    } else if (data.deptDto?.deptNo) {
      deptPath = [data.deptDto.deptNo];
    }

    const values: any = {
      ...data,
      companyType: data.companyDto.companyType,
      userBirthday: _isNil(data?.userBirthday) ? undefined : moment(data?.userBirthday),
      roleNo: _first(data?.roleDtos)?.roleNo,
      deptPath: deptPath,
    };
    return values;
  }, [data]);

  const handleSuccess = useCallback(() => {
    message.success('操作成功');
    queryClient.invalidateQueries(['userInfo', id]);
    history.replace('/system/user');
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
          <UserForm
            isEdit
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
