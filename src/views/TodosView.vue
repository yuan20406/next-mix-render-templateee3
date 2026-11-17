<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore, type Filter } from '@/stores/todos'

const store = useTodoStore()
const { visible, remaining, filter, items } = storeToRefs(store)
const draft = ref('')

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '未完成' },
  { value: 'done', label: '已完成' },
]

function submit() {
  store.add(draft.value)
  draft.value = ''
}
</script>

<template>
  <h1 class="page-title">待办清单</h1>
  <p class="page-desc">数据保存在 Pinia 中，并同步到 localStorage，刷新页面不会丢失。</p>

  <div class="panel">
    <form class="add" @submit.prevent="submit">
      <input v-model="draft" type="text" placeholder="要做点什么？按回车添加" maxlength="100" />
      <button class="btn" type="submit">添加</button>
    </form>

    <div class="toolbar">
      <div class="filters">
        <button
          v-for="f in filters"
          :key="f.value"
          type="button"
          :class="['chip', { active: filter === f.value }]"
          @click="filter = f.value"
        >
          {{ f.label }}
        </button>
      </div>
      <span class="count">剩余 {{ remaining }} 项</span>
    </div>

    <ul v-if="visible.length" class="list">
      <li v-for="todo in visible" :key="todo.id" :class="{ done: todo.done }">
        <label>
          <input type="checkbox" :checked="todo.done" @change="store.toggle(todo.id)" />
          <span>{{ todo.text }}</span>
        </label>
        <button class="remove" type="button" aria-label="删除" @click="store.remove(todo.id)">×</button>
      </li>
    </ul>
    <p v-else class="empty">{{ items.length ? '这个分类下没有待办' : '还没有待办，先添加一条吧' }}</p>

    <div v-if="items.length !== remaining" class="footer-row">
      <button class="link" type="button" @click="store.clearDone()">清除已完成</button>
    </div>
  </div>
</template>

<style scoped>
.panel {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fff;
}
.add {
  display: flex;
  gap: 8px;
}
.add input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
}
.add input:focus {
  border-color: var(--brand);
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 8px;
}
.filters {
  display: flex;
  gap: 6px;
}
.chip {
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
  color: var(--text-muted);
  cursor: pointer;
}
.chip.active {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand-dark);
}
.count {
  font-size: 13px;
  color: var(--text-muted);
}
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 4px;
  border-bottom: 1px solid var(--border);
}
.list label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  word-break: break-all;
}
.list input {
  accent-color: var(--brand);
  width: 16px;
  height: 16px;
}
.list li.done span {
  color: var(--text-muted);
  text-decoration: line-through;
}
.remove {
  border: none;
  background: none;
  font-size: 20px;
  line-height: 1;
  color: var(--text-muted);
  cursor: pointer;
}
.remove:hover {
  color: var(--danger);
}
.empty {
  margin: 24px 0 12px;
  text-align: center;
  color: var(--text-muted);
}
.footer-row {
  margin-top: 12px;
  text-align: right;
}
.link {
  border: none;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
}
.link:hover {
  color: var(--danger);
}
</style>
