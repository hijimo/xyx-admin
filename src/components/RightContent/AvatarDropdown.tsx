import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import { useHistory, useModel } from 'umi';
import runtimeConfig from 'runtimeConfig';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { logout } from '@/services/user';
import type { MenuInfo } from 'rc-menu/lib/interface';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const { success } = await logout();
  if (success) {
    message.success('退出登录成功');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const history = useHistory();

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState, history],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      {/* <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      /> */}
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.userName) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <a
        href={`${runtimeConfig.heraOrigin}/account?from=${window.location.href}`}
        target="_blank"
        rel="noreferrer"
        className={`${styles.action} ${styles.account}`}
      >
        <Avatar
          size="small"
          className={styles.avatar}
          src={currentUser.userPhoto || '/default-avatar.png'}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
      </a>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
