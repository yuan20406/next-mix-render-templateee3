# Vue SSG 示例

基于 **Vue 3 + Vite + vite-ssg + TypeScript** 的静态站点生成（SSG）示例，内置 Vue Router 和 Pinia，可直接部署到 EdgeOne Pages 或任意静态托管。

构建时每个页面都会预渲染成独立的 HTML 文件，首屏直接是完整内容，对 SEO 友好；浏览器加载后再"水合"为 Vue 应用，之后页面切换不刷新。

## 功能

- **首页**（`/`）：组合式 API 计数器 + 功能介绍卡片
- **待办清单**（`/todos`）：Pinia 管理状态，自动保存到 localStorage，支持筛选和清除已完成
- **关于**（`/about`）：技术栈与目录结构说明
- **自定义 404 页面**：构建产出 `dist/404.html`，访问不存在的地址时由托管平台返回（HTTP 404），页面会显示请求地址，并提供返回首页、返回上一页和推荐入口

## 构建产物

```
dist/
├── index.html          /
├── todos/index.html    /todos
├── about/index.html    /about
├── 404/index.html      /404
├── 404.html            托管平台使用的 404 页面
└── assets/             JS / CSS
```

## 技术栈

| 名称 | 用途 |
| --- | --- |
| Vue 3 | 前端框架，`<script setup>` 写法 |
| Vite 6 | 开发服务器与构建 |
| vite-ssg 27 | 构建时预渲染每个路由为静态 HTML |
| @unhead/vue | 为每个页面写入独立的 `<title>` |
| Vue Router 4 | 路由，懒加载 + 通配 404 |
| Pinia | 状态管理，构建时状态序列化进 HTML |
| TypeScript / vue-tsc | 类型检查 |

## 本地开发

需要 Node.js `>=20.18.0`（已在 20.18.0、22.11.0、22.22 上验证构建）。

> 构建工具固定在 Vite 6 + vite-ssg 27 + Vue Router 4：Vite 7/8、vite-ssg 28.3（jsdom 28）和 Vue Router 5 要求 Node ≥ 22.12，
> 在 EdgeOne Pages 预装的 Node 22.11.0 / 20.18.0 上会构建失败。`edgeone.json` 里已指定 `nodeVersion: 22.11.0`。

```bash
npm install
npm run dev       # 开发服务器 http://localhost:5173（开发时是普通 SPA 模式）
npm run build     # 类型检查 + 静态生成，产物在 dist/
npm run preview   # 本地预览构建产物
```

## 新增页面

1. 在 `src/views/` 新建页面组件
2. 在 `src/router/index.ts` 的 `routes` 中添加路由，并设置 `meta.title`
3. 不含动态参数（如 `:id`）的路由会自动预渲染；动态路由需要在 `vite.config.ts` 的 `ssgOptions.includedRoutes` 里列出要生成的具体路径

## SSG 注意事项

- 组件的 `setup` 会在构建时（Node 环境）执行一次，**不要在 setup 顶层直接访问 `window`、`document`、`localStorage`**，放到 `onMounted` 里。待办清单的 `restore()` 就是这样做的。
- 构建时渲染的内容必须和浏览器首次渲染一致，否则会出现水合不一致。只有浏览器里才能拿到的信息（如 404 页面显示的实际请求地址）都在 `onMounted` 之后再显示。

## 部署到 EdgeOne Pages

仓库根目录的 `edgeone.json` 已配置好：

- 构建命令：`npm run build`
- 输出目录：`dist`
- 不再配置 SPA 回退：每个页面都有自己的 HTML，不存在的地址由 `404.html` 处理

## 目录结构

```
├── edgeone.json          EdgeOne Pages 配置
├── index.html            HTML 模板
├── public/               静态资源（原样复制）
├── src/
│   ├── main.ts           应用入口（ViteSSG）
│   ├── App.vue           根组件 + 页面标题
│   ├── style.css         全局样式
│   ├── router/           路由表
│   ├── stores/           Pinia store
│   ├── components/       通用组件
│   └── views/            页面组件（含 NotFoundView 404 页面）
├── vite.config.ts        Vite 与 vite-ssg 配置
└── tsconfig*.json
```
