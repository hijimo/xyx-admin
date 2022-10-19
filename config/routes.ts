import { AuthorityMap } from '../src/access';
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
        icon: 'AppstoreOutlined',
        routes: [
          {
            access: AuthorityMap.BANNER_INDEX,
            path: './',
            name: 'list',
            component: './banner',
            hideInMenu: true,
          },
          {
            access: AuthorityMap.BANNER_ADD,
            path: 'add',
            name: 'add',
            component: './banner/add',
            hideInMenu: true,
          },
          {
            access: AuthorityMap.BANNER_EDIT,
            path: ':id/edit',
            name: 'edit',
            component: './banner/edit',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/strategy',
        name: 'strategy',
        icon: 'MenuOutlined',
        routes: [
          {
            path: './',
            name: 'list',
            hideInMenu: true,
            component: './strategy',
          },
          {
            path: 'add',
            name: 'add',
            hideInMenu: true,
            component: './strategy/add',
          },
          {
            path: ':id/edit',
            name: 'edit',
            hideInMenu: true,
            component: './strategy/edit',
          },
        ],
      },
      {
        path: '/figure',
        name: 'figure',
        icon: 'MenuOutlined',
        routes: [
          {
            path: './',
            name: 'list',
            hideInMenu: true,
            component: './figure',
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
        path: '/:strategyId/chapter',
        name: 'chapter',
        icon: 'MenuOutlined',
        hideInMenu: true,
        routes: [
          {
            path: './',
            name: 'list',
            hideInMenu: true,
            component: './chapter',
          },
          {
            path: 'add',
            name: 'add',
            hideInMenu: true,
            component: './chapter/add',
          },
          {
            path: ':id/edit',
            name: 'edit',
            hideInMenu: true,
            component: './chapter/edit',
          },
        ],
      },
      {
        path: '/config',
        icon: 'setting',
        name: 'config',
        routes: [
          {
            path: 'audio',
            name: 'audio',
            icon: 'MenuOutlined',
            routes: [
              {
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './config/audio',
              },
              {
                path: ':type/add',
                name: 'add',
                hideInMenu: true,
                component: './config/add',
              },
              {
                path: ':type/:id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './config/edit',
              },
            ],
          },
          {
            path: 'image',
            name: 'image',
            icon: 'MenuOutlined',
            routes: [
              {
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './config/image',
              },
              {
                path: ':type/add',
                name: 'add',
                hideInMenu: true,
                component: './config/add',
              },
              {
                path: ':type/:id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './config/edit',
              },
            ],
          },
          {
            path: 'reward',
            name: 'reward',
            icon: 'MenuOutlined',
            routes: [
              {
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './config/reward',
              },
              {
                path: ':type/add',
                name: 'add',
                hideInMenu: true,
                component: './config/add',
              },
              {
                path: ':type/:id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './config/edit',
              },
            ],
          },
          {
            path: 'strategy',
            name: 'strategy',
            icon: 'MenuOutlined',
            routes: [
              {
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './config/strategy',
              },
              {
                path: ':type/add',
                name: 'add',
                hideInMenu: true,
                component: './config/add',
              },
              {
                path: ':type/:id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './config/edit',
              },
            ],
          },
          {
            path: 'final',
            name: 'final',
            icon: 'MenuOutlined',
            routes: [
              {
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './config/final',
              },
              {
                path: ':type/add',
                name: 'add',
                hideInMenu: true,
                component: './config/add',
              },
              {
                path: ':type/:id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './config/edit',
              },
            ],
          },
          {
            path: 'time',
            name: 'time',
            icon: 'MenuOutlined',
            routes: [
              {
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './config/time',
              },
              {
                path: ':type/add',
                name: 'add',
                hideInMenu: true,
                component: './config/add',
              },
              {
                path: ':type/:id/edit',
                name: 'edit',
                hideInMenu: true,
                component: './config/edit',
              },
            ],
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
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './system/dept',
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
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './system/role',
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
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './system/user',
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
          //
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
          //
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
          //
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
                path: './',
                name: 'list',
                hideInMenu: true,
                component: './system/dict',
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
