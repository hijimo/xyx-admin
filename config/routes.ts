import { AuthorityMap } from '../src/access';
import runtimeConfig from './runtime';

export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    menu: {
      flatMenu: true,
    },
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        title: '欢迎',
        component: './Welcome',
        hideInMenu: true,
      },

      // {
      //   path: '/system',
      //   name: 'system',
      //   icon: 'ToolOutlined',
      //   routes: [
      //     {
      //       access: AuthorityMap.SYSTEM_OPERATION_LOG_HOME,
      //       path: '/system/operationLog',
      //       name: 'operationLog',
      //       component: './system/operationLog',
      //     },
      //     {
      //       access: AuthorityMap.SYSTEM_ROLE_MANAGE,
      //       path: `${runtimeConfig.heraOrigin}/roleManage`,
      //       name: 'roleManage',
      //       target: '_blank',
      //     },
      //     {
      //       access: AuthorityMap.SYSTEM_USER_MANAGE,
      //       path: `${runtimeConfig.heraOrigin}/userManage`,
      //       name: 'userManage',
      //       target: '_blank',
      //     },
      //   ],
      // },
    ],
  },
];
