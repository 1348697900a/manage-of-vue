import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
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
];

export default routes;
