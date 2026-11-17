<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="nf">
    <p class="code">404</p>
    <h1>页面不存在</h1>
    <p class="desc">没有找到 <code>{{ route.fullPath }}</code></p>
    <RouterLink to="/" class="btn">返回首页</RouterLink>
  </section>
</template>

<style scoped>
.nf {
  padding: 60px 0;
  text-align: center;
}
.code {
  margin: 0;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  color: var(--brand);
}
h1 {
  margin: 12px 0 8px;
  font-size: 24px;
}
.desc {
  margin: 0 0 24px;
  color: var(--text-muted);
}
code {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--surface);
}
</style>
