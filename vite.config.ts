import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ViteSSGOptions } from 'vite-ssg'

const ssgOptions: ViteSSGOptions = {
  script: 'async',
  formatting: 'minify',
  // 每个页面输出为一个独立文件：/ -> index.html，/about -> about.html，/404 -> 404.html。
  // 不用 about/index.html 这种目录结构：很多静态托管（包括 vite preview）收到 /about（不带结尾斜杠）时
  // 不会去找 about/index.html，而是退回根目录 index.html，结果所有页面都返回首页内容。
  // /about 到 about.html 的对应关系在 edgeone.json 的 rewrites 里显式声明。
  dirStyle: 'flat',
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
