import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// 不含动态参数的路由会在构建时各自生成一个 HTML 文件：
//   /       -> dist/index.html
//   /todos  -> dist/todos.html
//   /about  -> dist/about.html
//   /404    -> dist/404.html（托管平台对不存在的地址返回它）
// 通配路由不会被预渲染，只负责浏览器内跳转到不存在的地址时显示 404。
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '首页' },
  },
  {
    path: '/todos',
    name: 'todos',
    component: () => import('@/views/TodosView.vue'),
    meta: { title: '待办清单' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于' },
  },
  {
    path: '/404',
    name: 'not-found-page',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在' },
  },
]
