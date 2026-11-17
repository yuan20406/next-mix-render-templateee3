<script setup lang="ts">
import { ref } from 'vue'
import FeatureCard from '@/components/FeatureCard.vue'

const count = ref(0)

const features = [
  {
    tag: '组合式 API',
    title: '<script setup> 写法',
    description: '用 ref、computed、watch 组织逻辑，代码更短，类型推导更完整。',
  },
  {
    tag: '路由',
    title: 'Vue Router 前端路由',
    description: 'History 模式 + 路由懒加载，切换页面不刷新，刷新子页面也不会 404。',
  },
  {
    tag: '状态管理',
    title: 'Pinia 全局状态',
    description: '待办清单的数据放在 Pinia 里，并自动保存到浏览器 localStorage。',
  },
  {
    tag: '工程化',
    title: 'Vite + TypeScript',
    description: '秒级启动的开发服务器，构建前用 vue-tsc 做类型检查。',
  },
]
</script>

<template>
  <section class="hero">
    <h1>一个干净的 <span class="accent">Vue 3</span> 单页应用</h1>
    <p>基于 Vite 构建，内置路由、状态管理和 TypeScript，可以直接部署到 EdgeOne Pages。</p>
    <div class="actions">
      <RouterLink to="/todos" class="btn">试试待办清单</RouterLink>
      <button class="btn btn-ghost" type="button" @click="count++">点击计数：{{ count }}</button>
    </div>
  </section>

  <section class="grid">
    <FeatureCard v-for="f in features" :key="f.title" v-bind="f" />
  </section>
</template>

<style scoped>
.hero {
  padding: 40px 0 48px;
  text-align: center;
}
h1 {
  margin: 0 0 12px;
  font-size: clamp(28px, 5vw, 42px);
  line-height: 1.25;
}
.accent {
  color: var(--brand);
}
.hero p {
  max-width: 560px;
  margin: 0 auto 28px;
  color: var(--text-muted);
}
.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
}
</style>
