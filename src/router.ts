import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const getRoutes = () => {
  const modules = import.meta.glob('./page/*.tsx')

  return Object.entries(modules).map(([filePath, component]) => {
    const regex = /Day(\d+).tsx$/
    const match = filePath.match(regex)
    if (!match) {
      return null
    }
    const path = match[1]

    return {
      path: `/${path}`,
      component,
    } as RouteRecordRaw
  }).filter(Boolean) as RouteRecordRaw[]
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../src/components/Home.tsx'),
  },
  ...getRoutes(),
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
