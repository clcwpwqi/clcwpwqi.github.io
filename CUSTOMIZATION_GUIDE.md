# 网站自定义内容说明教程

本文档说明如何自定义博客的所有内容，所有配置文件位于 `/configs/` 目录下。

---

## 目录

1. [站点基础配置](#1-站点基础配置)
2. [导航和品牌配置](#2-导航和品牌配置)
3. [首页配置](#3-首页配置)
4. [关于页面配置](#4-关于页面配置)
5. [关于页面内容编辑](#5-关于页面内容编辑)
6. [工具箱配置](#6-工具箱配置)
7. [页脚配置](#7-页脚配置)
8. [标签配置](#8-标签配置)
9. [评论配置](#9-评论配置)
10. [图片使用指南](#10-图片使用指南)

---

## 1. 站点基础配置

**文件**：`/configs/site.json`

### 配置说明

```json
{
  "title": "clc'blog",
  "description": "一个简洁、现代的开发者博客，分享技术文章与实用工具",
  "author": "clcwpwqi",
  "email": "clcwpwqi@outlook.com",
  "github": "https://github.com/clcwpwqi",
  "telegram": "@clcwpwqi",
  "wechat": "clcwpwqi",
  "logo": "C",
  "avatar": {
    "src": "/images/avatar.png",
    "width": 200,
    "height": 200,
    "alt": "头像"
  },
  "comment": {
    "provider": "giscus",
    "repo": "clcwpwqi/clcwpwqi.github.io",
    "repoId": "R_kgDORslu9w",
    "category": "Announcements",
    "categoryId": "DIC_kwDORslu984C45V0"
  }
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 博客名称 |
| `description` | string | 是 | 博客描述（SEO用） |
| `author` | string | 是 | 作者名称 |
| `email` | string | 是 | 联系邮箱 |
| `github` | string | 是 | GitHub 主页链接 |
| `telegram` | string | 否 | Telegram 用户名 |
| `wechat` | string | 否 | 微信公众号 |
| `logo` | string | 是 | Logo 文字（图片加载失败时显示） |
| `avatar` | object | 否 | 作者头像配置 |
| `comment` | object | 是 | 评论系统配置 |

---

## 2. 导航和品牌配置

**文件**：`/configs/navigation.json`

### 配置说明

```json
{
  "brand": {
    "showLogo": true,
    "logo": "C",
    "logoImage": "/images/top.png",
    "name": "clc'blog"
  },
  "items": [
    { "label": "首页", "href": "/", "icon": "Home", "show": true },
    { "label": "分类", "href": "/categories", "icon": "Folder", "show": true },
    { "label": "工具箱", "href": "/tools", "icon": "Wrench", "show": true },
    { "label": "关于", "href": "/about", "icon": "User", "show": true }
  ],
  "search": { "enabled": true },
  "themeToggle": { "enabled": true }
}
```

### 品牌配置

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `brand.showLogo` | boolean | 否 | 是否显示 Logo，默认 true |
| `brand.logo` | string | 否 | Logo 文字（图片加载失败时显示） |
| `brand.logoImage` | string | 否 | Logo 图片路径，如 `/images/top.png` |
| `brand.name` | string | 否 | 博客名称 |

### Logo 图片要求

- **位置**：`public/images/top.png`
- **尺寸**：64×64 像素（推荐）
- **格式**：PNG（推荐透明背景）
- **最大文件大小**：50KB

---

## 3. 首页配置

**文件**：`/configs/homepage.json`

### 配置说明

```json
{
  "hero": {
    "title": "探索技术的",
    "highlight": "无限可能",
    "subtitle": "分享前端、后端、DevOps 等技术文章，提供实用的开发工具，助力开发者提升效率。",
    "buttons": [
      { "label": "浏览文章", "href": "#latest", "variant": "primary", "icon": "Sparkles" },
      { "label": "开发工具", "href": "/tools", "variant": "secondary", "icon": "TrendingUp" }
    ]
  },
  "featured": {
    "enabled": true,
    "title": "精选文章",
    "posts": ["react-typescript-modern-web", "tailwind-css-complete-guide"]
  },
  "latest": {
    "title": "最新文章"
  }
}
```

### Hero 配置

| 字段 | 类型 | 说明 |
|------|------|------|
| `hero.title` | string | 标题前半部分 |
| `hero.highlight` | string | 高亮部分（渐变色） |
| `hero.subtitle` | string | 副标题 |
| `hero.buttons` | array | 按钮列表 |

### 精选文章配置

| 字段 | 类型 | 说明 |
|------|------|------|
| `featured.enabled` | boolean | 是否显示精选文章 |
| `featured.title` | string | 精选文章区域标题 |
| `featured.posts` | array | 精选文章 slug 列表 |

**注意**：`featured.posts` 中的 slug 必须与文章 frontmatter 中的 slug 一致。

---

## 4. 关于页面配置

**文件**：`/configs/about.json`

### 完整配置示例

```json
{
  "hero": {
    "title": "关于",
    "subtitle": "了解更多关于我和我的博客"
  },
  "profile": {
    "name": "clcwpwqi",
    "role": "全栈开发者",
    "bio": "热爱技术，喜欢分享",
    "avatar": "/images/avatar.png",
    "skills": ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "Docker", "Git"]
  },
  "stats": {
    "enabled": true
  },
  "blog": {
    "enabled": true,
    "title": "关于博客",
    "content": ""
  },
  "contacts": {
    "enabled": true,
    "items": [
      { "label": "GitHub", "url": "https://github.com/clcwpwqi", "icon": "Github", "show": true, "action": "link" },
      { "label": "微信公众号", "url": "#wechat", "icon": "MessageCircle", "show": true, "action": "copy", "copyText": "clcwpwqi" },
      { "label": "Telegram", "url": "https://t.me/clcwpwqi", "icon": "Send", "show": true, "action": "link" },
      { "label": "Email", "url": "mailto:clcwpwqi@outlook.com", "icon": "Mail", "show": true, "action": "link" }
    ]
  },
  "support": {
    "enabled": true,
    "title": "支持我",
    "description": "如果我的文章对你有帮助，欢迎通过以下方式支持我：",
    "methods": [
      { "text": "微信打赏", "icon": "Heart", "image": "/images/wechat-pay.png" },
      { "text": "支付宝打赏", "icon": "Heart", "image": "/images/alipay.png" },
      { "text": "爱发电", "icon": "Heart", "url": "https://ifdian.net/a/clcwpwqi" }
    ]
  }
}
```

### 联系方式 action 类型

| action | 说明 |
|--------|------|
| `link` | 普通链接，点击跳转 |
| `copy` | 点击复制文本，需要配合 `copyText` 字段 |

### 支持方式类型

| 字段 | 说明 |
|------|------|
| `text` | 显示文字 |
| `icon` | 图标名称 |
| `image` | 二维码图片路径（可选） |
| `url` | 跳转链接（可选） |

---

## 5. 关于页面内容编辑

**目录**：`/configs/about/`

### 可编辑的内容文件

| 文件 | 用途 | 说明 |
|------|------|------|
| `about-me.md` | 关于我 | 作者介绍 |
| `about-blog.md` | 关于博客 | 博客介绍 |
| `skills.md` | 技术栈 | 技术栈标题和描述 |
| `author-tags.md` | 作者标签 | 显示在头像下方的标签 |

### 文件格式

所有文件支持 **frontmatter** 头部：

```markdown
---
title: 关于我
skills: ["React", "TypeScript"]
tags: ["全栈开发者", "开源爱好者"]
---

这里是 Markdown 正文内容，支持多行。
可以写多段文字。
```

### Frontmatter 字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 区域标题 |
| `skills` | array | 技术栈列表（仅 skills.md 使用） |
| `tags` | array | 作者标签列表（仅 author-tags.md 使用） |

### author-tags 示例

`/configs/about/author-tags.md`：

```markdown
---
title: 作者标签
tags: ["全栈开发者", "开源爱好者", "技术博主", "终身学习者"]
---
```

标签会显示在关于页面的头像和称号下方。

---

## 6. 工具箱配置

**文件**：`/configs/tools.json`

### 配置说明

```json
{
  "title": "开发者工具箱",
  "subtitle": "实用的纯前端开发工具，无需后端服务，数据完全在本地处理，安全高效",
  "tools": [
    {
      "id": "json-formatter",
      "name": "JSON 格式化",
      "description": "格式化、验证、压缩 JSON 数据",
      "icon": "Braces",
      "component": "JsonFormatter",
      "color": "from-blue-500 to-cyan-500",
      "show": true
    }
  ]
}
```

### 工具字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识 |
| `name` | string | 工具名称 |
| `description` | string | 工具描述 |
| `icon` | string | Lucide 图标名称 |
| `component` | string | 组件名称（必须与代码中的组件名一致） |
| `color` | string | 渐变色类名 |
| `show` | boolean | 是否显示 |

### 可用图标

所有 [Lucide React](https://lucide.dev/icons/) 图标都可用，常用图标：

| 图标名 | 说明 |
|--------|------|
| `Braces` | JSON/代码相关 |
| `Code` | 编码相关 |
| `Clock` | 时间相关 |
| `GitCompare` | 对比相关 |
| `Link` | URL/链接相关 |
| `Palette` | 颜色相关 |
| `Hash` | 哈希相关 |
| `Calculator` | 计算相关 |
| `Wrench` | 通用工具 |

---

## 7. 页脚配置

**文件**：`/configs/footer.json`

### 配置说明

```json
{
  "brand": {
    "logo": "C",
    "logoImage": "/images/top.png",
    "name": "clc'blog",
    "description": "一个简洁、现代的开发者博客"
  },
  "socialLinks": [
    { "name": "GitHub", "url": "https://github.com/clcwpwqi", "icon": "Github", "show": true },
    { "name": "微信公众号", "url": "#wechat", "icon": "MessageCircle", "show": true },
    { "name": "Telegram", "url": "https://t.me/clcwpwqi", "icon": "Send", "show": true },
    { "name": "Email", "url": "mailto:clcwpwqi@outlook.com", "icon": "Mail", "show": true }
  ],
  "copyright": {
    "text": "© 2024 clc'blog. All rights reserved."
  }
}
```

---

## 8. 标签配置

**文件**：`/posts/labels.json`

### 配置说明

```json
{
  "React": {
    "id": "react",
    "name": "React",
    "slug": "react",
    "color": "#61DAFB"
  },
  "TypeScript": {
    "id": "typescript",
    "name": "TypeScript",
    "slug": "typescript",
    "color": "#3178C6"
  }
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| 键名 | string | 文章 frontmatter 中使用的标签名（区分大小写） |
| `id` | string | 标签唯一标识 |
| `name` | string | 显示名称 |
| `slug` | string | URL 友好的标识 |
| `color` | string | 标签颜色（HEX 格式） |

**注意**：如果文章使用了 labels.json 中未定义的标签，系统会自动创建默认配置（蓝色 `#3B82F6`）。

---

## 9. 评论配置

评论系统配置在 `/configs/site.json` 的 `comment` 字段中：

```json
{
  "comment": {
    "provider": "giscus",
    "repo": "你的用户名/你的仓库名",
    "repoId": "从 giscus.app 获取",
    "category": "Announcements",
    "categoryId": "从 giscus.app 获取"
  }
}
```

### 配置步骤

1. 访问 [giscus.app](https://giscus.app/)
2. 选择你的仓库
3. 获取 `repoId` 和 `categoryId`
4. 填入配置文件中

---

## 10. 图片使用指南

详细图片说明请查看 [IMAGE_GUIDE.md](./IMAGE_GUIDE.md)

### 快速参考

| 图片类型 | 位置 | 推荐尺寸 | 格式 |
|----------|------|----------|------|
| Logo 图标 | `public/images/top.png` | 64×64 | PNG |
| 作者头像 | `public/images/avatar.png` | 200×200 | PNG/JPG |
| 打赏二维码 | `public/images/wechat-pay.png` | 200×200 | PNG |
| 文章头图 | 与文章同目录 | 800×450 | JPG/WebP |

---

## 注意事项

1. **所有配置文件修改后**，需要重新构建才能生效
2. **GitHub Actions 自动部署**：推送代码后会自动构建部署
3. **本地开发**：修改配置后需要重启开发服务器
4. **JSON 格式**：确保配置文件格式正确，无语法错误
5. **路径**：图片路径使用 `/images/xxx.png` 格式（相对于 public 目录）
