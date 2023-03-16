import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/recordList',
  },
  {
    path: '/recordList',
    name: '考勤管理',
    //component: () => import('@/views/record-list/wrapper-auth/index.vue'),
    component: () => import('@/views/record-list/index.vue'),
    meta: {
      icon: 'icon-find-replace',
      auth: 'record_list',
    },
  },
  {
    path: '/userList',
    name: '员工管理',
    component: () => import('@/views/user-list/wrapper-auth/index.vue'),
    meta: {
      icon: 'icon-settings',
      auth: 'user_list',
    },
  },
  {
    path: '/dataShow',
    name: '历史数据',
   // component: () => import('@/views/data-show/wrapper-auth/index.vue'),
   component: () => import('@/views/data-show/index.vue'),
    meta: {
      icon: 'icon-dashboard',
      auth: 'data_show',
    },
  },
  {
    path: '/login',
    name: '登陆界面',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
];

export default routes;
