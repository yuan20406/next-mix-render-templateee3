import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ViteSSGOptions } from 'vite-ssg'

// vite-ssg 默认配置：每个路由输出一个 HTML 文件（/ -> index.html，/about -> about.html，/404 -> 404.html）
const ssgOptions: ViteSSGOptions = {
  script: 'async',
  formatting: 'minify',
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
  ssgOptions,
})
