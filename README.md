# Vue SPA 示例

基于 **Vue 3 + Vite + TypeScript** 的单页应用示例，内置 Vue Router 和 Pinia，可直接部署到 EdgeOne Pages。

## 功能

- **首页**：组合式 API 计数器 + 功能介绍卡片
- **待办清单**（`/todos`）：Pinia 管理状态，自动保存到 localStorage，支持筛选和清除已完成
- **关于**（`/about`）：技术栈与目录结构说明
- **404 页面**：未匹配的路径由前端路由兜底

## 技术栈

| 名称 | 用途 |
| --- | --- |
| Vue 3 | 前端框架，`<script setup>` 写法 |
| Vite | 开发服务器与构建 |
| Vue Router | 前端路由，History 模式 + 懒加载 |
| Pinia | 状态管理 |
| TypeScript / vue-tsc | 类型检查 |

## 本地开发

需要 Node.js `^20.19.0` 或 `>=22.12.0`。

```bash
npm install
npm run dev       # 启动开发服务器 http://localhost:5173
npm run build     # 类型检查 + 生产构建，产物在 dist/
npm run preview   # 本地预览构建产物
```

## 部署到 EdgeOne Pages

仓库根目录的 `edgeone.json` 已配置好：

- 构建命令：`npm run build`
- 输出目录：`dist`
- SPA 回退：所有未命中静态资源的请求都返回 `/index.html`，刷新 `/todos` 等子页面不会 404

## 目录结构

```
├── edgeone.json          EdgeOne Pages 配置
├── index.html            HTML 入口
├── public/               静态资源（原样复制）
├── src/
│   ├── main.ts           应用入口
│   ├── App.vue           根组件
│   ├── style.css         全局样式
│   ├── router/           路由配置
│   ├── stores/           Pinia store
│   ├── components/       通用组件
│   └── views/            页面组件
├── vite.config.ts
└── tsconfig*.json
```
