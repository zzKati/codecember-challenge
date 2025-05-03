import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../src/components/Home.tsx'),
  },
  {
    path: '/1',
    component: () => import('../src/page/Day1.tsx'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
