import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useModel, useLocation } from 'umi';
import { Card, List } from 'antd';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { getMyProfile } from '@/services/user';
// import AvatarView from './components/AvatarView';
// import UserEmail from './components/UserEmail';
import UserPassword from './components/UserPassword';
import UserPhone from './components/UserPhone';
import UserName from './components/UserName';
import UserAccount from './components/UserAccount';
import styles from './index.less';

const AccountIndex: React.FC = () => {
  const { refresh } = useModel('@@initialState');
  const {
    query: { from },
  }: any = useLocation();

  const { data: userInfo, refetch } = useQuery(['userInfo'], () => getMyProfile(), {
    select: (d) => d.data,
  });

  const handleUserInfoUpdateSuccess = useCallback(() => {
    refresh();
    refetch();
  }, [refresh, refetch]);

  const handlePasswordUpdateSuccess = useCallback(() => {
    if (
      !!from &&
      (`${from}`.indexOf('sn-freight.com') !== -1 || `${from}`.indexOf('alltopbuy.com') !== -1)
    ) {
      window.location.href = from;
    }
  }, [from]);

  return (
    <PageHeaderWrapper className={styles.pageHeader}>
      <div className={styles.main}>
        <GridContent contentWidth="Fluid">
          <Card title="用户信息" bordered={false}>
            <List itemLayout="horizontal">
              {/* <AvatarView data={userInfo?.userPhoto} onSuccess={handleUserInfoUpdateSuccess} /> */}
              <UserName
                userId={userInfo?.id}
                oldName={userInfo?.userName}
                onSuccess={handleUserInfoUpdateSuccess}
              />
              <UserAccount data={userInfo?.account} />
              {/* <UserEmail data={userInfo?.userEmail} onSuccess={handleUserInfoUpdateSuccess} /> */}
              <UserPhone data={userInfo?.userMobile} onSuccess={handleUserInfoUpdateSuccess} />
              <UserPassword userId={userInfo?.id} onSuccess={handlePasswordUpdateSuccess} />
            </List>
          </Card>
        </GridContent>
      </div>
    </PageHeaderWrapper>
  );
};

export default AccountIndex;
