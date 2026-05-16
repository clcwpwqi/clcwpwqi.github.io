# 项目结构说明

## 目录树

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── public/
│   ├── images/                 # 图片资源
│   ├── robots.txt              # 搜索引擎爬虫配置
│   └── sitemap.xml             # 站点地图
├── src/
│   ├── components/             # 组件目录
│   │   ├── tools/             # 工具组件
│   │   │   ├── JsonFormatter.tsx
│   │   │   ├── Base64Tool.tsx
│   │   │   ├── TimestampTool.tsx
│   │   │   ├── TextDiffTool.tsx
│   │   │   ├── UrlEncoderTool.tsx
│   │   │   └── ColorConverterTool.tsx
│   │   ├── Footer.tsx         # 页脚组件
│   │   ├── GiscusComments.tsx # Giscus 评论组件
│   │   ├── Header.tsx         # 顶部导航组件
│   │   ├── MarkdownRenderer.tsx # Markdown 渲染组件
│   │   ├── PostCard.tsx       # 文章卡片组件
│   │   ├── ScrollToTop.tsx    # 返回顶部按钮
│   │   ├── SearchModal.tsx    # 搜索模态框
│   │   ├── SEO.tsx            # SEO 组件
│   │   ├── TableOfContents.tsx # 文章目录组件
│   │   └── TagCloud.tsx       # 标签云组件
│   ├── contexts/
│   │   └── ThemeContext.tsx   # 主题上下文（暗黑模式）
│   ├── data/
│   │   ├── config.ts          # 站点配置
│   │   └── posts.ts           # 文章数据
│   ├── hooks/
│   │   ├── useLocalStorage.ts # 本地存储 Hook
│   │   ├── useScrollPosition.ts # 滚动位置 Hook
│   │   └── useSearch.ts       # 搜索 Hook
│   ├── pages/
│   │   ├── AboutPage.tsx      # 关于页面
│   │   ├── CategoriesPage.tsx # 分类页面
│   │   ├── HomePage.tsx       # 首页
│   │   ├── NotFoundPage.tsx   # 404 页面
│   │   ├── PostPage.tsx       # 文章详情页
│   │   └── ToolsPage.tsx      # 工具箱页面
│   ├── types/
│   │   └── index.ts           # TypeScript 类型定义
│   ├── utils/
│   │   └── helpers.ts         # 工具函数
│   ├── App.css                # 应用样式
│   ├── App.tsx                # 主应用组件
│   ├── index.css              # 全局样式
│   └── main.tsx               # 入口文件
├── index.html                 # HTML 模板
├── package.json               # 依赖配置
├── tailwind.config.js         # Tailwind CSS 配置
├── tsconfig.json              # TypeScript 配置
└── vite.config.ts             # Vite 配置
```

## 核心文件说明

### 配置文件

| 文件 | 说明 |
|------|------|
| `src/data/config.ts` | 站点基本信息、导航链接、分类配置 |
| `vite.config.ts` | 构建工具配置，包括路径别名、输出目录等 |
| `tailwind.config.js` | Tailwind CSS 主题配置 |
| `tsconfig.json` | TypeScript 编译配置 |

### 数据文件

| 文件 | 说明 |
|------|------|
| `src/data/posts.ts` | 所有文章数据，包括内容、元数据等 |
| `src/data/config.ts` | 站点配置、导航、分类、工具列表 |

### 核心组件

| 组件 | 说明 |
|------|------|
| `Header` | 顶部导航，包含 Logo、导航链接、主题切换、搜索按钮 |
| `Footer` | 页脚，包含站点信息、快速链接、社交链接 |
| `PostCard` | 文章卡片，支持多种变体（默认、紧凑、精选） |
| `MarkdownRenderer` | Markdown 渲染器，支持代码高亮、表格等 |
| `SearchModal` | 搜索模态框，支持实时搜索 |
| `ThemeContext` | 主题上下文，管理暗黑模式状态 |

## 如何新增文章

1. 打开 `src/data/posts.ts`
2. 在 `posts` 数组中添加新文章对象
3. 确保包含以下字段：
   - `id`: 唯一标识
   - `title`: 文章标题
   - `slug`: URL 友好的标识
   - `excerpt`: 文章摘要
   - `content`: Markdown 格式的文章内容
   - `date`: 发布日期 (YYYY-MM-DD)
   - `category`: 分类 slug
   - `tags`: 标签数组
   - `readingTime`: 预计阅读时间（分钟）

## 如何配置评论系统

1. 访问 https://giscus.app/
2. 按照指引配置你的 GitHub 仓库
3. 将获取的配置参数填入 `src/data/config.ts` 中的 `comment` 部分

## 部署配置

项目已配置 GitHub Actions 自动部署：

- 推送到 `main` 分支自动触发构建
- 构建产物部署到 GitHub Pages
- 配置文件位于 `.github/workflows/deploy.yml`

## 自定义主题

### 修改颜色

编辑 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    },
  },
}
```

### 修改字体

编辑 `src/index.css`：

```css
body {
  font-family: 'Your Font', sans-serif;
}
```
