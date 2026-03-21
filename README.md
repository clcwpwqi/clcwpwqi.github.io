# DevBlog - 现代静态博客

一个基于 React + TypeScript + Tailwind CSS 构建的现代化静态博客，支持从 `/posts` 目录按分类文件夹自动读取 Markdown 文章。

## 特性

- 🎨 **现代设计** - 简洁美观的界面，支持响应式布局
- 🌙 **暗黑模式** - 支持自动/手动切换暗黑模式
- 📝 **Markdown 支持** - 完整的 Markdown 渲染，包括代码高亮
- 📂 **分类文件夹管理** - 文章按分类存放，如 `/posts/frontend/*.md`
- 🏷️ **动态标签系统** - 支持自定义标签配置（名称、颜色）
- 📁 **动态分类系统** - 通过创建文件夹和配置文件自动添加分类
- 🔍 **搜索功能** - 前端实现的实时文章搜索
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

---

## 文章管理

### 目录结构

```
/posts/
├── labels.json                 # 标签配置
├── frontend/                   # 前端开发分类
│   ├── frontend.json          # 分类配置
│   └── react-guide.md         # 文章
├── backend/                    # 后端开发分类
│   ├── backend.json
│   └── nodejs-guide.md
└── ...
```

### 新增文章

在对应分类文件夹下创建 Markdown 文件：

```markdown
---
title: "文章标题"
slug: "article-slug"
excerpt: "文章摘要"
date: "2024-01-15"
category: "frontend"
tags: ["React", "TypeScript"]
readingTime: 8
---

# 文章正文

支持完整的 Markdown 语法...
```

### 新增分类

1. 创建分类文件夹：`mkdir posts/my-category`
2. 创建分类配置文件 `posts/my-category/my-category.json`：

```json
{
  "id": "my-category",
  "name": "我的分类",
  "slug": "my-category",
  "description": "分类描述",
  "order": 6
}
```

3. 在该文件夹下添加 Markdown 文章
4. 推送代码，自动部署

### 标签配置

编辑 `/posts/labels.json`：

```json
{
  "React": {
    "id": "react",
    "name": "React",
    "slug": "react",
    "color": "#61DAFB"
  }
}
```

---

## 部署到 GitHub Pages

### 自动部署

项目已配置 GitHub Actions 自动部署：

1. 在仓库设置中启用 GitHub Pages
2. 选择 "GitHub Actions" 作为源
3. 推送代码到 `main` 分支，自动触发构建部署

### 部署触发条件

以下文件变化会自动触发部署：
- `posts/**` - 文章、分类、标签配置
- `src/**` - 源代码
- `public/**` - 静态资源
- `scripts/**` - 构建脚本
- 配置文件

---

## 项目文档

- [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) - 项目文件功能详细说明
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - 项目结构说明

---

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

### 评论系统

1. 访问 https://giscus.app/
2. 获取配置参数
3. 编辑 `src/data/config.ts` 中的 `comment` 部分

---

## 浏览器支持

- Chrome / Edge (最新版)
- Firefox (最新版)
- Safari (最新版)
- 移动端浏览器

## 许可证

MIT License
