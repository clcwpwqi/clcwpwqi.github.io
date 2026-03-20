# DevBlog - 现代静态博客

一个基于 React + TypeScript + Tailwind CSS 构建的现代化静态博客，支持从 `/posts` 目录自动读取 Markdown 文章。

## 特性

- 🎨 **现代设计** - 简洁美观的界面，支持响应式布局
- 🌙 **暗黑模式** - 支持自动/手动切换暗黑模式
- 📝 **Markdown 支持** - 完整的 Markdown 渲染，包括代码高亮
- 📂 **文章自动同步** - 只需在 `/posts` 目录添加 `.md` 文件即可自动发布
- 🔍 **搜索功能** - 前端实现的实时文章搜索
- 🏷️ **分类标签** - 支持文章分类和标签筛选
- 💬 **评论系统** - 集成 Giscus（基于 GitHub Discussions）
- 🛠️ **开发工具** - 内置 JSON 格式化、Base64 编解码等实用工具
- 🔗 **SEO 优化** - 完善的 meta 标签和 Open Graph 支持
- ⚡ **自动部署** - GitHub Actions 自动构建部署

## 技术栈

- **框架**: React 18 + TypeScript
- **构建**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router
- **Markdown**: react-markdown + highlight.js
- **动画**: Framer Motion
- **图标**: Lucide React

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/username/devblog.git
cd devblog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

## 如何新增文章

### 方法一：直接在 `/posts` 目录添加 Markdown 文件（推荐）

1. 在 `posts/` 目录下创建新的 `.md` 文件，例如 `my-new-post.md`
2. 在文件头部添加 frontmatter 信息
3. 提交并推送到 GitHub，自动触发部署

```markdown
---
title: "文章标题"
slug: "article-slug"
excerpt: "文章摘要，显示在列表中"
date: "2024-01-15"
category: "frontend"
tags: ["React", "TypeScript"]
readingTime: 8
---

# 文章标题

正文内容，支持 Markdown 语法...

## 二级标题

- 列表项1
- 列表项2

\`\`\`javascript
// 代码块
const example = 'Hello World';
\`\`\`
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题 |
| `slug` | ✅ | URL 友好的标识，如 `react-hooks-guide` |
| `excerpt` | ✅ | 文章摘要，显示在列表中 |
| `date` | ✅ | 发布日期，格式 `YYYY-MM-DD` |
| `category` | ✅ | 分类 slug，见下方可用分类 |
| `tags` | ✅ | 标签数组，如 `["React", "Hooks"]` |
| `updatedAt` | ❌ | 更新日期（可选） |
| `readingTime` | ❌ | 预计阅读时间（分钟），不填则自动计算 |
| `cover` | ❌ | 封面图片路径（可选） |
| `author` | ❌ | 作者名（可选，默认使用站点配置） |

### 可用分类

| slug | 名称 |
|------|------|
| `frontend` | 前端开发 |
| `backend` | 后端开发 |
| `devops` | DevOps |
| `tools` | 工具效率 |
| `best-practices` | 最佳实践 |

### 文章模板

参考 `posts/TEMPLATE.md` 文件，包含完整的格式说明和示例。

## 项目结构

```
├── posts/                      # 文章目录（Markdown 文件）
│   ├── TEMPLATE.md            # 文章模板
│   ├── react-typescript-modern-web.md
│   └── ...
├── scripts/
│   └── build-posts.js         # Markdown 解析脚本
├── src/
│   ├── components/            # 组件
│   ├── data/
│   │   ├── config.ts          # 站点配置
│   │   ├── posts.ts           # 文章数据入口
│   │   └── posts.json         # 生成的文章数据（自动）
│   └── ...
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions 自动部署
└── ...
```

## 如何配置评论系统

本项目使用 [Giscus](https://giscus.app/) 作为评论系统，基于 GitHub Discussions。

### 配置步骤

1. **创建仓库**
   - 创建一个新的 GitHub 仓库用于存储评论（如 `username/blog-comments`）
   - 或者使用博客源码仓库

2. **安装 Giscus**
   - 访问 https://giscus.app/
   - 输入你的仓库名称
   - 选择 Discussions 分类
   - 获取配置参数

3. **修改配置**
   - 打开 `src/data/config.ts`
   - 更新 `comment` 部分：

```typescript
comment: {
  provider: 'giscus',
  repo: 'username/blog-comments',
  repoId: 'R_kgDOG...',
  category: 'Announcements',
  categoryId: 'DIC_kwDOG...',
  mapping: 'pathname',
  reactionsEnabled: true,
  emitMetadata: false,
  theme: 'preferred_color_scheme',
  crossorigin: 'anonymous',
}
```

4. **重新构建部署**

## 部署到 GitHub Pages

### 自动部署（推荐）

项目已配置 GitHub Actions 自动部署：

1. 在仓库设置中启用 GitHub Pages
2. 选择 "GitHub Actions" 作为源
3. 推送代码到 `main` 分支，自动触发构建部署

### 部署触发条件

以下文件变化会自动触发部署：
- `posts/**` - 文章目录
- `src/**` - 源代码
- `public/**` - 静态资源
- `index.html`, `package.json`, `vite.config.ts` 等配置文件

### 手动部署

```bash
# 构建
npm run build

# 部署到 gh-pages 分支（需要安装 gh-pages）
npm install -D gh-pages
npm run deploy
```

## 自定义配置

### 站点信息

编辑 `src/data/config.ts`：

```typescript
export const siteConfig: SiteConfig = {
  title: '你的博客名称',
  description: '博客描述',
  author: '作者名',
  email: 'your@email.com',
  github: 'https://github.com/username',
  // ...
};
```

### 导航链接

编辑 `src/data/config.ts` 中的 `navLinks`：

```typescript
export const navLinks = [
  { label: '首页', href: '/' },
  { label: '分类', href: '/categories' },
  { label: '工具箱', href: '/tools' },
  { label: '关于', href: '/about' },
];
```

### 分类

编辑 `src/data/config.ts` 中的 `categories`：

```typescript
export const categories: Category[] = [
  {
    id: '1',
    name: '前端开发',
    slug: 'frontend',
    description: '前端技术文章',
    count: 0,
  },
  // ...
];
```

## 浏览器支持

- Chrome / Edge (最新版)
- Firefox (最新版)
- Safari (最新版)
- 移动端浏览器

## 许可证

MIT License

## 致谢

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Giscus](https://giscus.app/)
