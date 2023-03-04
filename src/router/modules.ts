import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/recordList',
    name: '考勤管理',
    //component: () => import("@/views/403/index.vue"),
    component: () => import('@/views/record-list/index.vue'),
    meta: {
      icon: 'icon-find-replace',
    },
  },
  {
    path: '/userList',
    name: '用户管理',
    component: () => import('@/views/user-list/index.vue'),
    meta: {
      icon: 'icon-user-add',
    },
  },
];

export default routes;
