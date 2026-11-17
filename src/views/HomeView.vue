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
    description: '每个页面在构建时预渲染成独立 HTML，加载后切换页面依然不刷新。',
  },
  {
    tag: '状态管理',
    title: 'Pinia 全局状态',
    description: '待办清单的数据放在 Pinia 里，并自动保存到浏览器 localStorage。',
  },
  {
    tag: '静态生成',
    title: 'vite-ssg 预渲染',
    description: '构建时输出纯静态页面，首屏直接是完整内容，对 SEO 友好，适合任意静态托管。',
  },
]
</script>

<template>
  <section class="hero">
    <h1>一个干净的 <span class="accent">Vue 3</span> 静态站点</h1>
    <p>基于 Vite + vite-ssg 静态生成，内置路由、状态管理和 TypeScript，可以直接部署到 EdgeOne Pages。</p>
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
