import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () => import("@/components/Errors/404.vue"),
  },
  {
    path: "/home",
    component: () => import('@/pages/main-page/index.vue'),
  },
  {
    path: '/detail/:id',
    component: () => import('@/pages/detail/index.vue'),
  },
  {
    path: '/favorites',
    component: () => import('@/pages/favorite/index.vue'),
  }
];
