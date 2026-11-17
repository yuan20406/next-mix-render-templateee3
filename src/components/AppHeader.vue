<script setup lang="ts">
const links = [
  { to: '/', label: '首页' },
  { to: '/todos', label: '待办清单' },
  { to: '/about', label: '关于' },
]
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand">
        <img src="/favicon.svg" alt="" width="24" height="24" />
        <span>Vue SPA 示例</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          exact-active-class="is-active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid var(--border);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text);
}
.nav {
  display: flex;
  gap: 4px;
}
.nav-link {
  padding: 6px 12px;
  border-radius: 8px;
  color: var(--text-muted);
  transition: background 0.15s, color 0.15s;
}
.nav-link:hover {
  background: var(--surface);
  color: var(--text);
}
.nav-link.is-active {
  background: var(--brand-soft);
  color: var(--brand-dark);
}
@media (max-width: 520px) {
  .brand span {
    display: none;
  }
}
</style>
