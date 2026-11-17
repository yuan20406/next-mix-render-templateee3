<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 404.html 是在构建时用 /404 预渲染的，真实访问地址只有到浏览器里才知道，
// 所以地址和"返回上一页"都在挂载后再显示，避免水合时内容不一致。
const missingPath = ref('')
const canGoBack = ref(false)

onMounted(() => {
  const path = window.location.pathname + window.location.search
  missingPath.value = path === '/404' || path === '/404.html' ? '' : path
  canGoBack.value = window.history.length > 1
})

const suggestions = [
  { to: '/', title: '首页', desc: '看看这个示例都有什么' },
  { to: '/todos', title: '待办清单', desc: '记录一点要做的事' },
  { to: '/about', title: '关于', desc: '技术栈与目录结构' },
]
</script>

<template>
  <section class="nf">
    <svg class="art" viewBox="0 0 240 120" aria-hidden="true">
      <text x="20" y="96" class="digit">4</text>
      <g class="planet">
        <circle cx="120" cy="62" r="34" />
        <ellipse cx="120" cy="62" rx="54" ry="12" class="ring" />
        <circle cx="108" cy="52" r="5" class="crater" />
        <circle cx="132" cy="72" r="3.5" class="crater" />
      </g>
      <text x="168" y="96" class="digit">4</text>
    </svg>

    <h1>这个页面走丢了</h1>
    <p class="desc">
      你访问的地址不存在，可能是链接写错了，或者页面已经被移走。
    </p>
    <p v-if="missingPath" class="path">
      <span>请求地址</span>
      <code>{{ missingPath }}</code>
    </p>

    <div class="actions">
      <RouterLink to="/" class="btn">返回首页</RouterLink>
      <button v-if="canGoBack" type="button" class="btn btn-ghost" @click="router.back()">
        返回上一页
      </button>
    </div>

    <div class="suggest">
      <p class="suggest-title">或者去这些地方看看</p>
      <div class="suggest-grid">
        <RouterLink v-for="s in suggestions" :key="s.to" :to="s.to" class="suggest-card">
          <strong>{{ s.title }}</strong>
          <span>{{ s.desc }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nf {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 0 40px;
  text-align: center;
}
.art {
  width: 240px;
  max-width: 70%;
  height: auto;
  margin-bottom: 8px;
}
.digit {
  font-size: 104px;
  font-weight: 700;
  fill: var(--brand);
}
.planet circle {
  fill: var(--brand-soft);
  stroke: var(--brand);
  stroke-width: 2;
}
.planet .ring {
  fill: none;
  stroke: var(--brand-dark);
  stroke-width: 2;
  stroke-dasharray: 4 4;
}
.planet .crater {
  fill: #fff;
  stroke: var(--brand);
  stroke-width: 1.5;
}
@media (prefers-reduced-motion: no-preference) {
  .planet {
    transform-origin: 120px 62px;
    animation: float 3s ease-in-out infinite;
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
h1 {
  margin: 0 0 8px;
  font-size: 26px;
}
.desc {
  margin: 0 0 16px;
  color: var(--text-muted);
}
.path {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--text-muted);
}
.path code {
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--surface);
  color: var(--text);
  word-break: break-all;
}
.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
}
.suggest {
  padding-top: 24px;
  border-top: 1px dashed var(--border);
}
.suggest-title {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--text-muted);
}
.suggest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}
.suggest-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fff;
  text-align: left;
  transition: border-color 0.15s, transform 0.15s;
}
.suggest-card:hover {
  border-color: var(--brand);
  transform: translateY(-2px);
}
.suggest-card span {
  font-size: 13px;
  color: var(--text-muted);
}
</style>
