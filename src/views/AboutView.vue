<script setup lang="ts">
import { version } from 'vue'

const stack = [
  { name: 'Vue', desc: `渐进式前端框架（运行版本 ${version}）` },
  { name: 'Vite', desc: '开发服务器与构建工具' },
  { name: 'Vue Router', desc: '前端路由，History 模式' },
  { name: 'Pinia', desc: '官方推荐的状态管理库' },
  { name: 'TypeScript', desc: '类型检查，构建前由 vue-tsc 执行' },
]
</script>

<template>
  <h1 class="page-title">关于</h1>
  <p class="page-desc">这是一个用于演示的 Vue 单页应用，所有页面都在浏览器里渲染，没有服务端逻辑。</p>

  <ul class="stack">
    <li v-for="item in stack" :key="item.name">
      <strong>{{ item.name }}</strong>
      <span>{{ item.desc }}</span>
    </li>
  </ul>

  <h2>目录结构</h2>
  <pre class="tree">src/
├── main.ts            应用入口
├── App.vue            根组件（导航 + 路由出口）
├── router/index.ts    路由配置
├── stores/todos.ts    Pinia 待办 store
├── components/        通用组件
└── views/             页面组件</pre>
</template>

<style scoped>
.stack {
  margin: 0 0 32px;
  padding: 0;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fff;
}
.stack li {
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
}
.stack li:last-child {
  border-bottom: none;
}
.stack strong {
  min-width: 100px;
}
.stack span {
  color: var(--text-muted);
}
h2 {
  font-size: 18px;
  margin: 0 0 12px;
}
.tree {
  margin: 0;
  padding: 16px 20px;
  border-radius: 12px;
  background: var(--surface);
  font-size: 13px;
  line-height: 1.7;
  overflow-x: auto;
}
</style>
