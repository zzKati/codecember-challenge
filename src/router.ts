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
  {
    path: '/2',
    component: () => import('../src/page/Day2.tsx'),
  },
  {
    path: '/3',
    component: () => import('../src/page/Day3.tsx'),
  },
  {
    path: '/4',
    component: () => import('../src/page/Day4.tsx'),
  },
  {
    path: '/test',
    component: () => import('../src/page/Test.tsx'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
