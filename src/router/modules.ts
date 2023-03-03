import type { RouteRecordRaw } from 'vue-router'
const routes:RouteRecordRaw[] = [
    {
      path: '/recordList',
      name: '考勤管理',
      component: () => import("@/views/record-list/index.vue"),
      meta: {
        icon:"icon-list",
      },
    },{
      path: '/authList',
      name: '权限设置',
      component: () => import("@/views/auth-list/index.vue"),
      meta: {
        icon:"icon-settings",
      },
    },{
      path: '/hhh',
      name: '无权限页面',
      component: () => import("@/views/test/index.vue"),
      meta: {
        icon:"icon-settings",
        auth:'hhh'
      },
    },
  ]

export default routes