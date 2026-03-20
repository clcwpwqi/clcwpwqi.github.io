# DevBlog - 现代静态博客

一个基于 React + TypeScript + Tailwind CSS 构建的现代化静态博客，支持暗黑模式、Markdown 渲染、代码高亮、评论系统等丰富功能。

## 特性

- 🎨 **现代设计** - 简洁美观的界面，支持响应式布局
- 🌙 **暗黑模式** - 支持自动/手动切换暗黑模式
- 📝 **Markdown 支持** - 完整的 Markdown 渲染，包括代码高亮
- 🔍 **搜索功能** - 前端实现的实时文章搜索
- 🏷️ **分类标签** - 支持文章分类和标签筛选
- 💬 **评论系统** - 集成 Giscus（基于 GitHub Discussions）
- 🛠️ **开发工具** - 内置 JSON 格式化、Base64 编解码等实用工具
- 🔗 **SEO 优化** - 完善的 meta 标签和 Open Graph 支持
- ⚡ **性能优化** - 代码分割、懒加载等优化

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

## 项目结构

```
├── public/                 # 静态资源
├── src/
│   ├── components/         # 组件
│   │   ├── tools/         # 工具组件
│   │   └── ...
│   ├── contexts/          # React Context
│   ├── data/              # 数据和配置
│   ├── hooks/             # 自定义 Hooks
│   ├── pages/             # 页面组件
│   ├── styles/            # 样式文件
│   ├── types/             # TypeScript 类型
│   ├── utils/             # 工具函数
│   ├── App.tsx            # 主应用组件
│   └── main.tsx           # 入口文件
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 如何新增文章

1. 打开 `src/data/posts.ts` 文件
2. 在 `posts` 数组中添加新文章对象：

```typescript
{
  id: '7',
  title: '文章标题',
  slug: 'article-slug',  // URL 友好的标识
  excerpt: '文章摘要，显示在列表中',
  content: `
# 文章标题

正文内容，支持 Markdown 语法...

## 二级标题

- 列表项1
- 列表项2

\`\`\`javascript
// 代码块
const example = 'Hello World';
\`\`\`
  `,
  date: '2024-01-20',
  updatedAt: '2024-01-21',  // 可选
  category: 'frontend',     // 分类 slug
  tags: ['React', 'TypeScript'],
  cover: '/images/cover.png',  // 可选
  readingTime: 5,
  author: 'Author Name',
}
```

3. 重新构建部署

### Markdown 写作规范

- 使用 `#` 表示一级标题（文章主标题）
- 使用 `##` 表示二级标题（章节标题）
- 使用 `###` 表示三级标题（小节标题）
- 代码块使用三个反引号包裹，并指定语言
- 支持 GitHub 风格的表格、任务列表等

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
  repo: 'username/blog-comments',  // 你的仓库
  repoId: 'R_kgDOG...',            // 从 giscus.app 获取
  category: 'Announcements',
  categoryId: 'DIC_kwDOG...',      // 从 giscus.app 获取
  mapping: 'pathname',
  reactionsEnabled: true,
  emitMetadata: false,
  theme: 'preferred_color_scheme',
  crossorigin: 'anonymous',
}
```

4. **重新构建部署**

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions（推荐）

1. 在仓库设置中启用 GitHub Pages
2. 选择 "GitHub Actions" 作为源
3. 推送代码，自动触发部署

### 方法二：手动部署

```bash
# 构建
npm run build

# 部署到 gh-pages 分支
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
