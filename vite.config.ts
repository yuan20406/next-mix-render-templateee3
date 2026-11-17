import { copyFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ViteSSGOptions } from 'vite-ssg'

const outDir = fileURLToPath(new URL('./dist', import.meta.url))

const ssgOptions: ViteSSGOptions = {
  script: 'async',
  formatting: 'minify',
  // 每个页面输出为 <路由>/index.html，例如 dist/about/index.html
  dirStyle: 'nested',
  // 静态托管平台会把根目录的 404.html 作为 404 页面返回
  async onFinished() {
    await copyFile(`${outDir}/404/index.html`, `${outDir}/404.html`)
  },
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
