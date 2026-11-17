import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface Todo {
  id: number
  text: string
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'

const STORAGE_KEY = 'vue-ssg-demo:todos'

export const useTodoStore = defineStore('todos', () => {
  // 构建（服务端渲染）时没有 localStorage，初始一律为空列表，
  // 页面在浏览器挂载后再调用 restore() 读取本地数据，避免水合不一致。
  const items = ref<Todo[]>([])
  const filter = ref<Filter>('all')
  const restored = ref(false)

  const visible = computed(() => {
    if (filter.value === 'active') return items.value.filter((t) => !t.done)
    if (filter.value === 'done') return items.value.filter((t) => t.done)
    return items.value
  })
  const remaining = computed(() => items.value.filter((t) => !t.done).length)

  function restore() {
    if (restored.value || typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) items.value = JSON.parse(raw) as Todo[]
    } catch {
      items.value = []
    }
    restored.value = true
  }

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

  watch(
    items,
    (val) => {
      if (restored.value) localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true },
  )

  return { items, filter, restored, visible, remaining, restore, add, toggle, remove, clearDone }
})
