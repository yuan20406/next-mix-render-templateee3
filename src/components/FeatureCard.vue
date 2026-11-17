<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tag: string
}>()
</script>

<template>
  <article class="card">
    <span class="tag">{{ tag }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </article>
</template>

<style scoped>
.card {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fff;
  transition: border-color 0.15s, transform 0.15s;
}
.card:hover {
  border-color: var(--brand);
  transform: translateY(-2px);
}
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  background: var(--brand-soft);
  color: var(--brand-dark);
}
h3 {
  margin: 12px 0 6px;
  font-size: 17px;
}
p {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}
</style>
