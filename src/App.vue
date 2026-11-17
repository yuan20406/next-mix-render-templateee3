<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()

// 标题在构建时就写进每个页面的 HTML，浏览器内切换页面时也会同步更新
useHead({
  htmlAttrs: { lang: 'zh-CN' },
  title: () => {
    const title = route.meta.title as string | undefined
    return title ? `${title} · Vue SSG 示例` : 'Vue SSG 示例'
  },
})
</script>

<template>
  <AppHeader />
  <main class="container">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <footer class="footer">
    <span>Vue 3 · Vite · vite-ssg · Vue Router · Pinia</span>
  </footer>
</template>
