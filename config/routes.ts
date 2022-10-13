// import { AuthorityMap } from '../src/access';
// import runtimeConfig from './runtime';

// path: `${runtimeConfig.heraOrigin}/roleManage`,

export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    menu: {
      flatMenu: true,
    },
    routes: [
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/',
        redirect: '/welcome',
      },

      {
        path: '/user',
        layout: false,
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/banner',
        name: 'banner',
        icon: 'MenuOutlined',
        routes: [
          {
            path: '.',
            name: 'list',
            hideInMenu: true,
            component: './banner',
            exact: true,
          },
          {
            path: 'add',
            name: 'add',
            hideInMenu: true,
            component: './banner/add',
          },
          {
            path: ':id/edit',
            name: 'edit',
            hideInMenu: true,
            component: './banner/edit',
          },
        ],
      },
      {
        path: '/figure',
        name: 'figure',
        icon: 'MenuOutlined',
        routes: [
          {
            path: '.',
            name: 'list',
            hideInMenu: true,
            component: './figure',
            exact: true,
          },
          {
            path: 'add',
            name: 'add',
            hideInMenu: true,
            component: './figure/add',
          },
          {
            path: ':id/edit',
            name: 'edit',
            hideInMenu: true,
            component: './figure/edit',
          },
        ],
      },
      {
        path: '/system',
        icon: 'setting',
        name: 'system',
        routes: [
          {
            path: 'dept',
            name: 'dept',
            icon: 'MenuOutlined',
            routes: [
              {
                path: '.',
                name: 'list',
                hideInMenu: true,
                component: './system/dept',
                exact: true,
              },
              {
                path: 'add',
                name: 'add',
                hideInMenu: true,
                component: './system/dept/add',
              },
              {
                path: ':id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './system/dept/edit',
              },
            ],
          },
          {
            path: 'role',
            name: 'role',
            icon: 'TeamOutlined',
            routes: [
              {
                // access: AuthorityMap.ROLE_INDEX,
                path: '.',
                name: 'list',
                hideInMenu: true,
                component: './system/role',
                // exact: true,
              },
              {
                // access: AuthorityMap.ROLE_ADD,
                path: 'add',
                name: 'add',
                hideInMenu: true,
                component: './system/role/add',
              },
              {
                // access: AuthorityMap.ROLE_EDIT,
                path: ':id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './system/role/edit',
              },
            ],
          },
          {
            path: 'user',
            name: 'user',
            icon: 'UserOutlined',
            routes: [
              {
                // access: AuthorityMap.USER_INDEX,
                path: '.',
                name: 'list',
                hideInMenu: true,
                component: './system/user',
                // exact: true,
              },
              {
                // access: AuthorityMap.USER_ADD,
                path: 'add',
                name: 'add',
                hideInMenu: true,
                component: './system/user/add',
              },
              {
                // access: AuthorityMap.USER_EDIT,
                path: ':id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './system/user/edit',
              },
            ],
          },
          // {
          //   path: '/system/company',
          //   name: 'company',
          //   icon: 'MenuOutlined',
          //   hideInMenu: true,
          //   routes: [
          //     {
          //       access: AuthorityMap.COMPANY_INDEX,
          //       path: '/system/company',
          //       name: 'index',
          //       hideInMenu: true,
          //       component: './system/company',
          //       exact: true,
          //     },
          //     {
          //       access: AuthorityMap.COMPANY_ADD,
          //       path: '/system/company/add',
          //       name: 'add',
          //       hideInMenu: true,
          //       component: './system/company/add',
          //     },
          //     {
          //       access: AuthorityMap.COMPANY_DETAIL,
          //       path: '/system/company/:id',
          //       name: 'companyDetail',
          //       hideInMenu: true,
          //       exact: true,
          //       component: './system/company/detail',
          //     },
          //     {
          //       access: AuthorityMap.COMPANY_EDIT,
          //       path: '/system/company/:id/edit',
          //       name: 'edit',
          //       hideInMenu: true,
          //       component: './system/company/edit',
          //     },
          //   ],
          // },
          // {
          //   path: '/system/dept',
          //   name: 'dept',
          //   icon: 'MenuOutlined',
          //   hideInMneu: true,
          //   routes: [
          //     {
          //       access: AuthorityMap.DEPT_INDEX,
          //       path: '/system/dept',
          //       name: 'index',
          //       hideInMenu: true,
          //       component: './system/dept',
          //       exact: true,
          //     },
          //     {
          //       access: AuthorityMap.DEPT_ADD,
          //       path: '/system/dept/add',
          //       name: 'add',
          //       hideInMenu: true,
          //       component: './system/dept/add',
          //     },
          //     {
          //       access: AuthorityMap.DEPT_EDIT,
          //       path: '/system/dept/:id/edit',
          //       name: 'edit',
          //       hideInMenu: true,
          //       component: './system/dept/edit',
          //     },
          //   ],
          // },
          {
            path: 'dict',
            name: 'dict',
            icon: 'MenuOutlined',
            hideInMenu: true,
            routes: [
              {
                path: '.',
                name: 'list',
                hideInMenu: true,
                component: './system/dict',
                exact: true,
              },
              {
                path: 'add',
                name: 'add',
                hideInMenu: true,
                component: './system/dict/add',
              },
              {
                path: ':type/edit',
                name: 'edit',
                hideInMenu: true,
                component: './system/dict/edit',
              },
            ],
          },
          // {
          //   // access: AuthorityMap.RESOURCE_MANAGE_LIST,
          //   access: AuthorityMap.LOG_INDEX,
          //   path: '/system/log',
          //   name: 'log',
          //   icon: 'MenuOutlined',
          //   component: './system/log',
          // },
        ],
      },
      {
        // access: AuthorityMap.ACCOUNT_INFO,
        path: '/account',
        name: 'account',
        component: './account',
        hideInMenu: true,
      },
      {
        component: './404',
      },
    ],
  },
];
