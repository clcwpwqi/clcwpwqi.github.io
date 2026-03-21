# 项目文件功能说明

本文档详细介绍项目中各个文件和目录的功能，帮助理解系统架构和快速定位需要修改的内容。

## 目录结构总览

```
├── posts/                          # 文章、分类、标签配置目录
│   ├── labels.json                 # 标签配置（名称、颜色等）
│   ├── frontend/                   # 前端开发分类
│   │   ├── frontend.json           # 分类配置
│   │   └── *.md                    # 该分类下的文章
│   ├── backend/                    # 后端开发分类
│   ├── devops/                     # DevOps 分类
│   ├── tools/                      # 工具效率分类
│   └── best-practices/             # 最佳实践分类
├── scripts/
│   └── build-posts.js              # 文章解析构建脚本
├── src/
│   ├── components/                 # React 组件
│   ├── contexts/                   # React Context
│   ├── data/                       # 数据文件
│   ├── hooks/                      # 自定义 Hooks
│   ├── pages/                      # 页面组件
│   ├── types/                      # TypeScript 类型定义
│   └── utils/                      # 工具函数
└── .github/workflows/
    └── deploy.yml                  # GitHub Actions 自动部署
```

---

## 文章系统详解

### 1. 文章目录 `/posts`

这是整个博客的核心内容目录，采用**分类文件夹**结构管理文章。

#### 目录结构规则

```
/posts/
├── labels.json                     # 全局标签配置
├── [分类slug]/                     # 分类文件夹
│   ├── [分类slug].json            # 分类配置（必需）
│   └── *.md                        # Markdown 文章
```

#### 新增分类流程

1. 创建分类文件夹：`mkdir /posts/my-category`
2. 创建分类配置文件：`/posts/my-category/my-category.json`
3. 在该文件夹下添加 Markdown 文章
4. 推送代码，自动部署

---

### 2. 标签配置 `/posts/labels.json`

**功能**：定义所有标签的显示名称、slug、颜色等属性。

**格式**：

```json
{
  "React": {                          // 文章 frontmatter 中使用的标签名
    "id": "react",                    // 标签唯一标识
    "name": "React",                  // 显示名称
    "slug": "react",                  // URL 友好的标识
    "color": "#61DAFB"                // 标签颜色（用于UI显示）
  },
  "TypeScript": {
    "id": "typescript",
    "name": "TypeScript",
    "slug": "typescript",
    "color": "#3178C6"
  }
}
```

**自动创建标签**：
- 如果文章使用了 labels.json 中未定义的标签，系统会自动创建默认配置
- 默认颜色为 `#3B82F6`（蓝色）

---

### 3. 分类配置 `/posts/[分类]/[分类].json`

**功能**：定义分类的基本信息。

**格式**：

```json
{
  "id": "frontend",                   // 分类唯一标识
  "name": "前端开发",                  // 显示名称
  "slug": "frontend",                 // URL 友好的标识
  "description": "前端技术文章",       // 分类描述
  "order": 1                          // 排序顺序（越小越靠前）
}
```

---

### 4. 文章文件 `/posts/[分类]/*.md`

**功能**：博客文章内容。

**Frontmatter 格式**：

```markdown
---
title: "文章标题"                      # 文章标题（必需）
slug: "article-slug"                  # URL 标识（必需）
excerpt: "文章摘要"                    # 列表中显示的摘要（必需）
date: "2024-01-15"                    # 发布日期（必需）
updatedAt: "2024-01-20"               # 更新日期（可选）
category: "frontend"                  # 分类 slug（必需）
tags: ["React", "TypeScript"]         # 标签数组（必需）
readingTime: 8                        # 阅读时间（可选，自动计算）
cover: "/images/cover.png"             # 封面图（可选）
author: "作者名"                      # 作者（可选，默认站点配置）
---

# 文章正文

支持完整的 Markdown 语法...
```

---

## 构建系统详解

### 5. 构建脚本 `/scripts/build-posts.js`

**功能**：
1. 扫描 `/posts` 目录下的所有分类文件夹
2. 读取每个分类的配置文件（`.json`）
3. 解析该分类下的所有 Markdown 文章
4. 提取 frontmatter 元数据
5. 生成 `src/data/posts.json`

**执行时机**：
- 开发时：`npm run dev` 自动执行
- 构建时：`npm run build` 自动执行
- GitHub Actions 部署时自动执行

**输出文件**：`src/data/posts.json`

```json
{
  "posts": [...],           // 所有文章数组
  "categories": [...],      // 所有分类数组
  "tags": [...],            // 所有标签数组（含文章数）
  "labelsConfig": {...}     // 标签配置对象
}
```

---

## 数据层详解

### 6. 数据入口 `/src/data/posts.ts`

**功能**：从 `posts.json` 加载数据，提供数据访问接口。

**导出内容**：

```typescript
export const posts: Post[]              // 所有文章
export const categories: Category[]     // 所有分类
export const tags: Tag[]                // 所有标签
export const labelsConfig               // 标签配置

// 数据访问函数
export const getAllPosts = () => posts
export const getPostBySlug = (slug: string) => ...
export const getPostsByCategory = (categorySlug: string) => ...
export const getPostsByTag = (tag: string) => ...
export const searchPosts = (query: string) => ...
export const getTagByName = (name: string) => ...
export const getCategoryBySlug = (slug: string) => ...
```

---

## 页面组件详解

### 7. 首页 `/src/pages/HomePage.tsx`

**功能**：展示精选文章、最新文章列表、分类和标签。

**主要功能**：
- 展示最新的 3 篇精选文章
- 文章列表（支持分类/标签筛选）
- 侧边栏显示分类和标签云

**路由**：`/`

---

### 8. 分类页面 `/src/pages/CategoriesPage.tsx`

**功能**：展示所有分类和标签，支持按分类/标签筛选文章。

**主要功能**：
- 分类卡片网格展示
- 标签云展示
- 筛选后的文章列表

**路由**：`/categories`

---

### 9. 文章详情页 `/src/pages/PostPage.tsx`

**功能**：展示单篇文章的完整内容。

**主要功能**：
- 文章标题、元信息
- Markdown 内容渲染
- 代码高亮
- 文章目录（TOC）
- 上一篇/下一篇导航
- Giscus 评论

**路由**：`/post/:slug`

---

### 10. 工具箱页面 `/src/pages/ToolsPage.tsx`

**功能**：展示各种前端开发工具。

**路由**：`/tools`

---

### 11. 关于页面 `/src/pages/AboutPage.tsx`

**功能**：展示博客和作者信息。

**路由**：`/about`

---

## 核心组件详解

### 12. 文章卡片 `/src/components/PostCard.tsx`

**功能**：在列表中展示文章摘要。

**Props**：

```typescript
interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact' | 'featured';
}
```

---

### 13. Markdown 渲染器 `/src/components/MarkdownRenderer.tsx`

**功能**：将 Markdown 内容渲染为 HTML，支持代码高亮。

**特性**：
- GitHub 风格 Markdown
- 代码块语法高亮
- 代码复制按钮
- 表格渲染
- 自定义链接样式

---

### 14. 标签云 `/src/components/TagCloud.tsx`

**功能**：展示标签列表，支持点击筛选。

**特性**：
- 根据文章数量调整标签大小
- 显示标签颜色
- 支持激活状态

---

### 15. 搜索模态框 `/src/components/SearchModal.tsx`

**功能**：文章搜索功能。

---

## 自动部署系统

### 16. GitHub Actions `/.github/workflows/deploy.yml`

**触发条件**：
- 推送到 `main` 分支
- 以下文件变更时触发：
  - `posts/**` - 文章、分类、标签配置
  - `src/**` - 源代码
  - `public/**` - 静态资源
  - `scripts/**` - 构建脚本
  - 配置文件

**部署流程**：
1. 检出代码
2. 安装依赖
3. 执行 `npm run build:posts`（解析文章）
4. 执行 `npm run build`（构建项目）
5. 部署到 GitHub Pages

---

## 工作流程示例

### 新增一篇文章

```bash
# 1. 在对应分类下创建 Markdown 文件
vim posts/frontend/my-new-article.md

# 2. 添加 frontmatter 和正文
# ...

# 3. 提交并推送
git add .
git commit -m "新增文章：xxx"
git push origin main

# 4. GitHub Actions 自动部署
```

### 新增一个分类

```bash
# 1. 创建分类文件夹
mkdir posts/mobile-dev

# 2. 创建分类配置文件
vim posts/mobile-dev/mobile-dev.json
# 内容：
# {
#   "id": "mobile-dev",
#   "name": "移动开发",
#   "slug": "mobile-dev",
#   "description": "iOS、Android、Flutter 等移动开发技术",
#   "order": 6
# }

# 3. 添加文章
vim posts/mobile-dev/flutter-guide.md

# 4. 提交并推送
git add .
git commit -m "新增移动开发分类"
git push origin main
```

### 新增/修改标签

```bash
# 编辑标签配置文件
vim posts/labels.json

# 添加新标签配置
# "Flutter": {
#   "id": "flutter",
#   "name": "Flutter",
#   "slug": "flutter",
#   "color": "#02569B"
# }

# 提交并推送
git add .
git commit -m "新增 Flutter 标签"
git push origin main
```

---

## 常见问题

### Q: 新增文章后网站不显示？

A: 检查以下几点：
1. 文章是否在正确的分类文件夹下
2. frontmatter 是否包含必需的字段（title, slug, excerpt, date, category, tags）
3. 推送后等待 GitHub Actions 部署完成

### Q: 新增标签后文章不显示？

A: 系统会自动创建未定义的标签，但建议：
1. 在 `labels.json` 中预先定义标签
2. 确保文章的 `tags` 数组中的标签名与配置一致（区分大小写）

### Q: 如何修改分类顺序？

A: 修改分类配置文件中的 `order` 字段，数字越小越靠前。
