import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/recordList',
    name: '考勤管理',
    component: () => import('@/views/record-list/index.vue'),
    meta: {
      icon: 'icon-find-replace',
    },
  },
  {
    path: '/userList',
    name: '员工管理',
    component: () => import('@/views/user-list/index.vue'),
    meta: {
      icon: 'icon-settings',
    },
  },
  {
    path: '/login',
    name: '登陆界面',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden:true

    },
  },
];

export default routes;
