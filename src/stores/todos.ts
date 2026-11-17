import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface Todo {
  id: number
  text: string
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'

const STORAGE_KEY = 'vue-spa-demo:todos'

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export const useTodoStore = defineStore('todos', () => {
  const items = ref<Todo[]>(load())
  const filter = ref<Filter>('all')

  const visible = computed(() => {
    if (filter.value === 'active') return items.value.filter((t) => !t.done)
    if (filter.value === 'done') return items.value.filter((t) => t.done)
    return items.value
  })
  const remaining = computed(() => items.value.filter((t) => !t.done).length)

  function add(text: string) {
    const value = text.trim()
    if (!value) return
    items.value.push({ id: Date.now(), text: value, done: false })
  }

  function toggle(id: number) {
    const todo = items.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function remove(id: number) {
    items.value = items.value.filter((t) => t.id !== id)
  }

  function clearDone() {
    items.value = items.value.filter((t) => !t.done)
  }

  watch(items, (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true })

  return { items, filter, visible, remaining, add, toggle, remove, clearDone }
})
