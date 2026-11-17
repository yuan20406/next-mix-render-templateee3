import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'
import './style.css'

// vite-ssg 在构建时用同一个入口把每个路由渲染成静态 HTML，
// 浏览器加载后再"水合"成可交互的 Vue 应用。
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior: () => ({ top: 0 }),
  },
  ({ app, initialState, isClient }) => {
    const pinia = createPinia()
    app.use(pinia)

    // 构建时把 Pinia 状态序列化进 HTML，浏览器端再恢复，保证两边一致
    if (isClient) {
      pinia.state.value = (initialState.pinia as typeof pinia.state.value) ?? {}
    } else {
      initialState.pinia = pinia.state.value
    }
  },
)
