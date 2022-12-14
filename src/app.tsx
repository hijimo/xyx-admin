import type { Dictionary } from 'lodash';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import type { UserSSD } from '@/types';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
// import type { ResponseData } from '@/utils/request';
import { getAuthroityMap } from '@/utils/menu';
import { getMyProfile } from './services/user';
import { iconfontUrl } from '@/components/Icon';

import 'swiper/swiper.min.css';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserSSD | null;
  authorities?: Dictionary<boolean> | null;
  // fetchUserInfo?: () => Promise<ResponseData<User> | undefined>;
}> {
  let currentUser: UserSSD | null = null;
  let authorities: Dictionary<boolean> | null = null;
  try {
    if ([loginPath].includes(window.location.pathname) === false) {
      const getUserInfo = getMyProfile();
      // const getRoleMenu = getUserRoleMenu({ resourceType: 0 });

      const result = await getUserInfo;
      if (result.success || result.code === 200) {
        currentUser = result.data?.user;

        const { menus } = result.data || {};
        if (menus) {
          authorities = getAuthroityMap([...(menus || [])]);
        }
      }
    } else {
      currentUser = null;
    }
  } catch {
    history.push(loginPath);
  }

  return {
    currentUser,
    authorities,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    iconfontUrl,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    // footerRender: () => <Footer />,
    // onPageChange: () => {
    //   const { location } = history;
    //   // 如果没有登录，重定向到 login
    //   if (!initialState?.currentUser && location.pathname !== loginPath) {
    //     history.push(loginPath);
    //   }
    // },
    links: [],
    menuHeaderRender: undefined,
    menuItemRender: (menuItemProps, defaultDom) => {
      const { location } = history;
      if (menuItemProps.isUrl) {
        return (
          <a href={menuItemProps.path} target={menuItemProps.target}>
            {defaultDom}
          </a>
        );
      }
      if (menuItemProps.children) {
        return defaultDom;
      }
      if (menuItemProps.path && location.pathname !== menuItemProps.path) {
        return (
          <Link to={menuItemProps.path} target={menuItemProps.target}>
            {defaultDom}
          </Link>
        );
      }
      return defaultDom;
    },
    itemRender: (route, params, routes) =>
      routes[0] === route ? (
        <span>{route.breadcrumbName}</span>
      ) : (
        <Link to={route.path}>{route.breadcrumbName}</Link>
      ),
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
