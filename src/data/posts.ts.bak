/**
 * 文章数据
 * 实际项目中，这些文章可以从 Markdown 文件加载
 */
import type { Post } from '@/types';

export const posts: Post[] = [
  {
    id: '1',
    title: '使用 React 和 TypeScript 构建现代 Web 应用',
    slug: 'react-typescript-modern-web',
    excerpt: '学习如何使用 React 和 TypeScript 构建类型安全、可维护的现代 Web 应用程序，包括最佳实践和常见模式。',
    content: `
# 使用 React 和 TypeScript 构建现代 Web 应用

React 和 TypeScript 的组合已经成为现代前端开发的标准配置。TypeScript 提供了静态类型检查，而 React 提供了灵活的组件化开发模式。

## 为什么选择 TypeScript？

TypeScript 带来了诸多好处：

- **类型安全**：在编译时捕获错误
- **智能提示**：更好的 IDE 支持
- **可维护性**：代码更易理解和重构
- **文档化**：类型即文档

## 基础配置

首先，创建一个新的 React + TypeScript 项目：

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## 组件定义

### 函数组件

使用 FC 类型或直接使用函数参数类型：

\`\`\`tsx
import { FC } from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

// 方式一：使用 FC
export const UserCard: FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      {avatar && <img src={avatar} alt={name} />}
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// 方式二：直接定义（推荐）
export function UserCard({ name, email, avatar }: UserCardProps) {
  return (
    <div className="user-card">
      {avatar && <img src={avatar} alt={name} />}
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
\`\`\`

## 常用类型定义

### 事件处理

\`\`\`tsx
// 按钮点击事件
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Clicked!', event.target);
};

// 输入框变化事件
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

// 表单提交事件
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // 处理提交
};
\`\`\`

### useState 钩子

\`\`\`tsx
// 基本类型
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('');
const [isActive, setIsActive] = useState<boolean>(false);

// 对象类型
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);

// 数组类型
const [items, setItems] = useState<string[]>([]);
\`\`\`

### useRef 钩子

\`\`\`tsx
// DOM 引用
const inputRef = useRef<HTMLInputElement>(null);

// 值引用（不触发重渲染）
const timerRef = useRef<number | null>(null);
\`\`\`

## 高级模式

### 泛型组件

\`\`\`tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// 使用
interface User {
  id: number;
  name: string;
}

<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
\`\`\`

### 条件类型

\`\`\`tsx
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
\`\`\`

## 最佳实践

1. **严格模式**：启用 strict: true 配置
2. **避免 any**：尽量使用具体类型
3. **类型推断**：让 TypeScript 自动推断简单类型
4. **接口优先**：使用 interface 定义对象形状
5. **类型导出**：公共类型应该导出

## 总结

React + TypeScript 的组合能够显著提高代码质量和开发效率。通过合理的类型定义，我们可以在编译时发现潜在问题，减少运行时错误。
    `,
    date: '2024-01-15',
    updatedAt: '2024-01-20',
    category: 'frontend',
    tags: ['React', 'TypeScript', 'Frontend'],
    cover: '/images/react-ts.png',
    readingTime: 8,
    author: 'Developer',
  },
  {
    id: '2',
    title: 'Tailwind CSS 实战指南：从入门到精通',
    slug: 'tailwind-css-complete-guide',
    excerpt: '全面掌握 Tailwind CSS 实用工具类框架，学习如何快速构建现代化、响应式的用户界面。',
    content: `
# Tailwind CSS 实战指南：从入门到精通

Tailwind CSS 是一个实用工具优先的 CSS 框架，它提供了低级实用类，让你能够快速构建自定义设计。

## 什么是 Tailwind CSS？

Tailwind 不同于 Bootstrap 等组件优先的框架。它不提供预构建的组件，而是提供：

- **实用工具类**：如 flex, pt-4, text-center
- **高度可定制**：通过配置文件自定义设计系统
- **响应式设计**：内置断点系统
- **暗黑模式**：原生支持暗黑主题

## 快速开始

### 安装

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### 配置

\`\`\`js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
      },
    },
  },
  plugins: [],
}
\`\`\`

### 引入基础样式

\`\`\`css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## 核心概念

### 布局工具

\`\`\`html
<!-- Flexbox -->
<div class="flex items-center justify-between">
  <div>左侧</div>
  <div>右侧</div>
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- 容器 -->
<div class="container mx-auto px-4">
  居中内容
</div>
\`\`\`

### 间距系统

Tailwind 使用 0.25rem（4px）作为基础单位：

| 类名 | 尺寸 |
|------|------|
| p-1 | 0.25rem (4px) |
| p-2 | 0.5rem (8px) |
| p-4 | 1rem (16px) |
| p-8 | 2rem (32px) |

\`\`\`html
<div class="p-4 m-2">内边距 16px，外边距 8px</div>
<div class="px-6 py-3">水平 24px，垂直 12px</div>
<div class="space-y-4">子元素垂直间距 16px</div>
\`\`\`

### 响应式设计

\`\`\`html
<!-- 移动端优先 -->
<div class="w-full md:w-1/2 lg:w-1/3">
  全宽 → 平板 50% → 桌面 33%
</div>

<!-- 文字大小 -->
<h1 class="text-xl md:text-2xl lg:text-3xl">
  响应式标题
</h1>

<!-- 显示控制 -->
<div class="hidden md:block">
  平板及以上显示
</div>
\`\`\`

断点默认值：
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## 高级技巧

### 自定义组件

使用 @apply 提取重复模式：

\`\`\`css
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }
  
  .btn-primary {
    @apply btn bg-blue-500 text-white hover:bg-blue-600;
  }
  
  .btn-secondary {
    @apply btn bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
}
\`\`\`

### 暗黑模式

\`\`\`js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 或 'media'
  // ...
}
\`\`\`

\`\`\`html
<div class="bg-white dark:bg-gray-900">
  <h1 class="text-gray-900 dark:text-white">
    自适应标题
  </h1>
</div>
\`\`\`

### 动画

\`\`\`html
<!-- 内置动画 -->
<div class="animate-pulse">脉冲效果</div>
<div class="animate-bounce">弹跳效果</div>
<div class="animate-spin">旋转效果</div>

<!-- 过渡效果 -->
<div class="transition-all duration-300 hover:scale-105">
  悬停放大
</div>
\`\`\`

## 实战示例

### 卡片组件

\`\`\`html
<div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
  <img class="w-full" src="/img/card-top.jpg" alt="Sunset">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-gray-900 dark:text-white">
      卡片标题
    </div>
    <p class="text-gray-700 dark:text-gray-300 text-base">
      卡片描述内容...
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
      #标签
    </span>
  </div>
</div>
\`\`\`

### 导航栏

\`\`\`html
<nav class="bg-white dark:bg-gray-900 shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <span class="text-xl font-bold">Logo</span>
      </div>
      <div class="hidden md:flex items-center space-x-4">
        <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-blue-500">首页</a>
        <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-blue-500">关于</a>
      </div>
    </div>
  </div>
</nav>
\`\`\`

## 性能优化

1. **JIT 模式**：只生成使用的 CSS
2. **PurgeCSS**：自动移除未使用的样式
3. **压缩**：生产环境自动压缩

\`\`\`js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // 自动启用 JIT
}
\`\`\`

## 总结

Tailwind CSS 通过实用工具类的方式，让开发者能够快速构建自定义界面。它的响应式设计和暗黑模式支持，使得构建现代化应用变得更加简单。
    `,
    date: '2024-01-10',
    updatedAt: '2024-01-12',
    category: 'frontend',
    tags: ['Tailwind CSS', 'CSS', 'Frontend'],
    cover: '/images/tailwind.png',
    readingTime: 10,
    author: 'Developer',
  },
  {
    id: '3',
    title: 'Docker 入门到实践：容器化你的应用',
    slug: 'docker-getting-started',
    excerpt: '学习 Docker 容器技术，了解如何构建、运行和部署容器化应用，提升开发和部署效率。',
    content: `
# Docker 入门到实践：容器化你的应用

Docker 是一个开源的容器化平台，它让开发者能够将应用及其依赖打包到一个轻量级、可移植的容器中。

## 什么是 Docker？

Docker 解决了"在我机器上能运行"的问题：

- **容器化**：应用和依赖一起打包
- **一致性**：开发、测试、生产环境一致
- **隔离性**：每个容器独立运行
- **轻量级**：比虚拟机更高效

## 核心概念

### 镜像（Image）

镜像是只读的模板，包含运行应用所需的代码、库、环境变量和配置文件。

### 容器（Container）

容器是镜像的运行实例，可以被创建、启动、停止、删除。

### Dockerfile

Dockerfile 是构建镜像的脚本文件。

## 安装 Docker

### macOS

\`\`\`bash
brew install --cask docker
\`\`\`

### Ubuntu

\`\`\`bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
\`\`\`

## 基础命令

### 镜像管理

\`\`\`bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx
\`\`\`

### 容器操作

\`\`\`bash
# 运行容器
docker run -d -p 80:80 --name my-nginx nginx

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop my-nginx

# 启动容器
docker start my-nginx

# 删除容器
docker rm my-nginx

# 进入容器
docker exec -it my-nginx /bin/bash
\`\`\`

## Dockerfile 编写

### 基础示例

\`\`\`dockerfile
# 基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]
\`\`\`

### 多阶段构建

\`\`\`dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
\`\`\`

## Docker Compose

使用 Docker Compose 管理多容器应用：

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
\`\`\`

### Compose 命令

\`\`\`bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重建镜像
docker-compose up -d --build
\`\`\`

## 最佳实践

### 镜像优化

1. **使用小体积基础镜像**：alpine 版本
2. **多阶段构建**：分离构建和运行环境
3. **层缓存优化**：将不常改变的指令放在前面
4. **.dockerignore**：排除不需要的文件

\`\`\`
node_modules
.git
.env
*.md
\`\`\`

### 安全实践

1. **不以 root 运行**：

\`\`\`dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
\`\`\`

2. **扫描镜像漏洞**：

\`\`\`bash
docker scan myimage:latest
\`\`\`

## 实战部署

### 部署到云服务器

\`\`\`bash
# 1. 构建镜像
docker build -t myapp:latest .

# 2. 保存镜像
docker save myapp:latest > myapp.tar

# 3. 传输到服务器
scp myapp.tar user@server:/tmp/

# 4. 在服务器加载镜像
docker load < /tmp/myapp.tar

# 5. 运行
docker run -d -p 80:3000 --name myapp myapp:latest
\`\`\`

## 总结

Docker 简化了应用的打包和部署流程，确保环境一致性。配合 Docker Compose，可以轻松管理复杂的多容器应用。
    `,
    date: '2024-01-05',
    updatedAt: '2024-01-08',
    category: 'devops',
    tags: ['Docker', 'DevOps', 'Container'],
    cover: '/images/docker.png',
    readingTime: 12,
    author: 'Developer',
  },
  {
    id: '4',
    title: 'Git 工作流与最佳实践',
    slug: 'git-workflow-best-practices',
    excerpt: '掌握 Git 版本控制系统的高级用法，了解主流 Git 工作流和团队协作最佳实践。',
    content: `
# Git 工作流与最佳实践

Git 是目前最流行的分布式版本控制系统。本文介绍 Git 的高级用法和团队协作最佳实践。

## Git 基础回顾

### 核心概念

- **工作区（Working Directory）**：实际文件
- **暂存区（Staging Area）**：准备提交的文件
- **本地仓库（Repository）**：完整的项目历史
- **远程仓库（Remote）**：共享的仓库

### 常用命令

\`\`\`bash
# 基础操作
git add <file>          # 添加到暂存区
git commit -m "msg"     # 提交更改
git push                # 推送到远程
git pull                # 拉取更新

# 分支操作
git branch              # 列出分支
git branch <name>       # 创建分支
git checkout <name>     # 切换分支
git merge <name>        # 合并分支
\`\`\`

## 分支策略

### Git Flow

经典的分支模型，适合发布周期明确的项目：

\`\`\`
main        ●────────────────●────────────────●
             \\                /
develop       ●────●────●────●────●────●────●
                   \\    /\\    /
feature/a           ●────●    \\
feature/b                      ●────●
\`\`\`

分支说明：
- main：生产分支，只接受合并
- develop：开发分支，集成所有功能
- feature/*：功能分支，从 develop 创建
- release/*：发布分支，准备新版本
- hotfix/*：热修复分支，修复生产问题

### GitHub Flow

简化的工作流，适合持续部署：

1. 从 main 创建功能分支
2. 提交更改
3. 创建 Pull Request
4. 代码审查
5. 合并到 main
6. 自动部署

### Trunk-Based Development

主干开发，所有开发者频繁向主干提交：

- 短生命周期的功能分支（< 1天）
- 特性开关控制功能可见性
- 持续集成，频繁合并

## 提交规范

### Conventional Commits

规范的提交信息格式：

\`\`\`
<type>(<scope>): <subject>

<body>

<footer>
\`\`\`

类型说明：
- feat：新功能
- fix：修复
- docs：文档
- style：格式（不影响代码运行）
- refactor：重构
- test：测试
- chore：构建/工具

示例：

\`\`\`bash
git commit -m "feat(auth): add OAuth2 login support"
git commit -m "fix(api): resolve null pointer exception"
git commit -m "docs(readme): update installation guide"
\`\`\`

## 高级技巧

### 交互式 Rebase

\`\`\`bash
# 整理最近 3 次提交
git rebase -i HEAD~3

# 常用命令
pick    # 保留提交
reword  # 修改提交信息
squash  # 合并到上一个提交
fixup   # 合并并丢弃提交信息
drop    # 删除提交
\`\`\`

### Stash 暂存

\`\`\`bash
# 暂存当前更改
git stash push -m "work in progress"

# 查看 stash 列表
git stash list

# 恢复最近的 stash
git stash pop

# 恢复指定 stash
git stash apply stash@{1}
\`\`\`

### Cherry Pick

\`\`\`bash
# 挑选特定提交到当前分支
git cherry-pick <commit-hash>

# 挑选多个提交
git cherry-pick <hash1> <hash2>
\`\`\`

### Bisect 二分查找

用于定位引入 bug 的提交：

\`\`\`bash
git bisect start
git bisect bad          # 当前版本有问题
git bisect good v1.0    # v1.0 版本正常
# Git 自动 checkout 中间版本
git bisect good/bad     # 标记是否正常
# 重复直到找到问题提交
git bisect reset        # 结束查找
\`\`\`

## 团队协作

### Pull Request 流程

1. **创建分支**：git checkout -b feature/xxx
2. **提交更改**：遵循提交规范
3. **推送分支**：git push -u origin feature/xxx
4. **创建 PR**：填写详细描述
5. **代码审查**：至少一人审查
6. **解决冲突**：如有需要
7. **合并分支**：使用 Squash 或 Merge

### 代码审查清单

- [ ] 代码符合项目规范
- [ ] 有足够的测试覆盖
- [ ] 文档已更新
- [ ] 没有明显的性能问题
- [ ] 安全性考虑到位

### 冲突解决

\`\`\`bash
# 拉取最新代码
git fetch origin

# 尝试合并
git merge origin/main

# 解决冲突后标记为已解决
git add <resolved-file>

# 完成合并
git commit
\`\`\`

## 钩子（Hooks）

### 常用钩子配置

\`\`\`bash
# pre-commit：提交前检查
#!/bin/sh
npm run lint
npm run test

# commit-msg：验证提交信息
#!/bin/sh
commit_msg=$(cat $1)
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .+"; then
  echo "提交信息格式错误！"
  exit 1
fi
\`\`\`

## 总结

良好的 Git 工作流能够提高团队协作效率，减少冲突和错误。选择适合团队的工作流，并严格执行提交规范，是项目成功的重要保障。
    `,
    date: '2024-01-01',
    updatedAt: '2024-01-03',
    category: 'best-practices',
    tags: ['Git', 'DevOps', 'Best Practices'],
    cover: '/images/git.png',
    readingTime: 10,
    author: 'Developer',
  },
  {
    id: '5',
    title: 'VS Code 效率提升指南',
    slug: 'vscode-productivity-guide',
    excerpt: '发掘 VS Code 的强大功能，学习快捷键、插件和配置技巧，大幅提升编码效率。',
    content: `
# VS Code 效率提升指南

Visual Studio Code 是目前最流行的代码编辑器之一。本文介绍如何通过各种技巧提升使用效率。

## 快捷键

### 基础快捷键

| 快捷键 | 功能 |
|--------|------|
| Cmd/Ctrl + P | 快速打开文件 |
| Cmd/Ctrl + Shift + P | 命令面板 |
| Cmd/Ctrl + , | 打开设置 |
| Cmd/Ctrl + B | 切换侧边栏 |
| Cmd/Ctrl + J | 切换面板 |

### 编辑快捷键

| 快捷键 | 功能 |
|--------|------|
| Cmd/Ctrl + D | 选中下一个相同词 |
| Cmd/Ctrl + Shift + L | 选中所有相同词 |
| Option/Alt + 点击 | 多光标 |
| Option/Alt + ↑/↓ | 移动行 |
| Option/Alt + Shift + ↑/↓ | 复制行 |
| Cmd/Ctrl + / | 注释切换 |
| Cmd/Ctrl + Shift + K | 删除行 |

### 导航快捷键

| 快捷键 | 功能 |
|--------|------|
| Cmd/Ctrl + G | 跳转到行 |
| Cmd/Ctrl + Shift + O | 跳转到符号 |
| Cmd/Ctrl + T | 工作区符号搜索 |
| Cmd/Ctrl + - | 返回上一位置 |
| Cmd/Ctrl + Shift + - | 前进 |

## 推荐插件

### 开发增强

1. **ES7+ React/Redux/React-Native snippets**
   - React 代码片段
   - 快速生成组件模板

2. **Auto Rename Tag**
   - 自动重命名配对标签
   - 修改开始标签，结束标签同步更新

3. **Bracket Pair Colorizer**
   - 括号配对着色
   - 提高代码可读性

4. **GitLens**
   - 增强 Git 功能
   - 显示代码作者、提交历史

### 代码质量

1. **ESLint**
   - JavaScript/TypeScript 代码检查
   - 自动修复问题

2. **Prettier**
   - 代码格式化
   - 统一代码风格

3. **Error Lens**
   - 内联显示错误和警告
   - 无需悬停查看

### 主题和外观

1. **Dracula Official**
   - 流行的暗色主题
   - 色彩舒适

2. **Material Icon Theme**
   - 文件图标主题
   - 丰富的文件类型图标

## 配置优化

### settings.json

\`\`\`json
{
  // 编辑器
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code, JetBrains Mono, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  
  // 文件
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true
  },
  
  // 搜索
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  },
  
  // Git
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  
  // 终端
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.shell.osx": "/bin/zsh",
  
  // Emmet
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
\`\`\`

## 代码片段

### 自定义代码片段

\`\`\`json
// typescriptreact.json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "interface \${1:ComponentName}Props {",
      "  \$2",
      "}",
      "",
      "export function \${1:ComponentName}({ \$3 }: \${1:ComponentName}Props) {",
      "  return (",
      "    <div>",
      "      \$0",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "Create a React functional component with TypeScript"
  },
  
  "useState Hook": {
    "prefix": "us",
    "body": [
      "const [\${1:state}, set\${1/(.*)/\${1:/capitalize}/}] = useState<\${2:type}>(\${3:initialValue});"
    ],
    "description": "React useState hook"
  },
  
  "useEffect Hook": {
    "prefix": "ue",
    "body": [
      "useEffect(() => {",
      "  \$1",
      "  ",
      "  return () => {",
      "    \$2",
      "  };",
      "}, [\$3]);"
    ],
    "description": "React useEffect hook"
  }
}
\`\`\`

## 调试配置

### launch.json

\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "\${workspaceFolder}/src"
    },
    {
      "name": "Debug Node.js",
      "type": "node",
      "request": "launch",
      "program": "\${workspaceFolder}/src/index.js"
    }
  ]
}
\`\`\`

## 高级功能

### 多根工作区

\`\`\`json
// my-project.code-workspace
{
  "folders": [
    { "path": "frontend" },
    { "path": "backend" },
    { "path": "shared" }
  ],
  "settings": {
    "files.exclude": {
      "**/node_modules": true
    }
  }
}
\`\`\`

### 远程开发

1. **Remote - SSH**：连接到远程服务器
2. **Remote - Containers**：在容器内开发
3. **Remote - WSL**：在 WSL 中开发

### 任务配置

\`\`\`json
// tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "shell",
      "command": "npm run build",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "Test",
      "type": "shell",
      "command": "npm test",
      "group": "test"
    }
  ]
}
\`\`\`

## 总结

熟练掌握 VS Code 的快捷键和插件，能够显著提升开发效率。建议花时间去了解和配置编辑器，让它成为你高效的开发工具。
    `,
    date: '2023-12-28',
    updatedAt: '2023-12-30',
    category: 'tools',
    tags: ['VS Code', 'Tools', 'Productivity'],
    cover: '/images/vscode.png',
    readingTime: 6,
    author: 'Developer',
  },
  {
    id: '6',
    title: 'Node.js 性能优化实践',
    slug: 'nodejs-performance-optimization',
    excerpt: '深入了解 Node.js 性能优化技巧，包括内存管理、异步处理、缓存策略等实战方案。',
    content: `
# Node.js 性能优化实践

Node.js 以其高性能和事件驱动模型著称，但不当的使用方式也会导致性能问题。本文介绍实用的优化技巧。

## 性能分析工具

### 内置工具

\`\`\`bash
# Node.js 内置分析器
node --prof app.js
node --prof-process isolate-0x*.log > profile.txt

# 性能钩子
node --perf-basic-prof app.js
\`\`\`

### Clinic.js

\`\`\`bash
npm install -g clinic

# 医生模式 - 全面诊断
clinic doctor -- node app.js

# 气泡图 - 事件循环分析
clinic bubbleprof -- node app.js

# 火焰图 - CPU 分析
clinic flame -- node app.js
\`\`\`

### 0x

\`\`\`bash
npm install -g 0x
0x node app.js
\`\`\`

## 代码级优化

### 1. 避免阻塞事件循环

\`\`\`javascript
// 阻塞操作
app.get('/slow', (req, res) => {
  const result = heavyComputation(); // 同步计算
  res.json(result);
});

// 使用 worker_threads
const { Worker } = require('worker_threads');

app.get('/fast', async (req, res) => {
  const worker = new Worker('./worker.js');
  worker.postMessage(data);
  worker.on('message', (result) => {
    res.json(result);
  });
});
\`\`\`

### 2. 优化异步操作

\`\`\`javascript
// 串行执行
for (const id of ids) {
  await fetchUser(id);
}

// 并行执行
await Promise.all(ids.map(id => fetchUser(id)));

// 控制并发数
const pLimit = require('p-limit');
const limit = pLimit(5);
await Promise.all(ids.map(id => limit(() => fetchUser(id))));
\`\`\`

### 3. 使用流处理大数据

\`\`\`javascript
// 内存中处理大文件
const data = fs.readFileSync('large-file.txt');
processData(data);

// 使用流
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(transformStream).pipe(writeStream);
\`\`\`

### 4. 连接池管理

\`\`\`javascript
// 数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
  connectionLimit: 10,
  queueLimit: 0
});

// HTTP 代理连接池
const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 50
});
\`\`\`

## 内存优化

### 1. 避免内存泄漏

\`\`\`javascript
// 事件监听器泄漏
class Emitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener); // 无限增长
  }
}

// 限制监听器数量或使用 WeakMap
class Emitter {
  constructor() {
    this.events = new Map();
    this.maxListeners = 10;
  }
  
  on(event, listener) {
    const listeners = this.events.get(event) || [];
    if (listeners.length >= this.maxListeners) {
      listeners.shift(); // 移除最旧的
    }
    listeners.push(listener);
    this.events.set(event, listeners);
  }
}
\`\`\`

### 2. 垃圾回收优化

\`\`\`javascript
// 手动触发垃圾回收（仅调试）
if (global.gc) {
  global.gc();
}

// 监控内存使用
setInterval(() => {
  const usage = process.memoryUsage();
  console.log({
    rss: (usage.rss / 1024 / 1024).toFixed(2) + ' MB',
    heapTotal: (usage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
    heapUsed: (usage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
  });
}, 30000);
\`\`\`

## 缓存策略

### 1. 内存缓存

\`\`\`javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

async function getUser(id) {
  const cached = cache.get('user:' + id);
  if (cached) return cached;
  
  const user = await db.users.findById(id);
  cache.set('user:' + id, user);
  return user;
}
\`\`\`

### 2. Redis 缓存

\`\`\`javascript
const Redis = require('ioredis');
const redis = new Redis();

async function getCachedData(key, fetchFn, ttl = 3600) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}
\`\`\`

## 集群和负载均衡

### 使用 Cluster 模块

\`\`\`javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log('Worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
} else {
  require('./app.js');
  console.log('Worker ' + process.pid + ' started');
}
\`\`\`

### PM2 集群模式

\`\`\`javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'app',
    script: './app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    max_memory_restart: '500M'
  }]
};
\`\`\`

## 总结

Node.js 性能优化是一个持续的过程。通过使用正确的工具进行分析，针对性地优化代码，可以显著提升应用性能。
    `,
    date: '2023-12-20',
    updatedAt: '2023-12-25',
    category: 'backend',
    tags: ['Node.js', 'Backend', 'Performance'],
    cover: '/images/nodejs.png',
    readingTime: 15,
    author: 'Developer',
  },
  {
    id: '7',
    title: 'CMS-2026 加密算法',
    slug: 'cms-2026-ea',
    excerpt: '使用HTML前端实现简单的加解密',
    content: `
# CMS-2026 Encryption Algorithm
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-success)
![Platform](https://img.shields.io/badge/Platform-Web_Crypto_API-orange)

**CMS-2026** 是一种基于现代浏览器原生的 Web Crypto API 构建的高强度加解密算法方案。它专为处理复杂的 Unicode 字符（如中文、Emoji）设计。

---

## 原理实现

CMS-2026 不依赖任何外部第三方数学库，完全利用硬件级加速的浏览器底层 API。

### 核心实现
算法遵循 **PBKDF2 → AES-256-GCM** 的安全链路：

* **密钥:** 使用 $PBKDF2$ (Password-Based Key Derivation Function 2) 算法。通过随机生成的 Salt与 $100,000$ 次 $SHA-256$ 迭代，将用户密码转化为 256 位的强加密密钥。
* **加密模式:** 采用 **AES-GCM** (Galois/Counter Mode)。与传统的 CBC 模式不同，GCM 提供“关联数据的认证加密”，能同时保证数据的机密性与完整性，防止密文被篡改。
* **编码转换:** 通过 `TextEncoder` 将 Unicode 字符串转为 `Uint8Array`，确保所有特殊符号无损。

---

## 支持情况

| 类型        | 支持范围                                  | 备注    |
| :-------- | :------------------------------------ | :---- |
| **语言**    | 中文、英文等所有 Unicode                      | 无乱码   |
| **符号**    | 特殊符号、数学公式、空格                          | 完美保留  |
| **Emoji** | 🌈, 🚀, 🐱‍👤 等复杂组合 Emoji             | 正常加解密 |
| **环境**    | Chrome, Edge, Safari, Android WebView | 正常支持  |

---

## 免责声明
此算法加密能力较弱，为HTML学习中的练习作品，且为开源算法，**请勿**在包括但不限于商业机密、密码保存、隐私数据、机密数据等方面使用本算法。使用本算法造成的包括但不限于机密泄露、隐私泄露、密码丢失等问题算法作者不承担任何责任。
    `,
    date: '2026-03-21',
    updatedAt: '2023-12-25-03-21',
    category: 'frontend',
    tags: ['HTML', 'frontend', 'Encryption'],
    cover: '/images/cms2026.png',
    readingTime: 15,
    author: 'Developer',
  }
];

// 获取所有文章
export const getAllPosts = () => posts;

// 根据 slug 获取文章
export const getPostBySlug = (slug: string) => {
  return posts.find((post) => post.slug === slug);
};

// 根据分类获取文章
export const getPostsByCategory = (categorySlug: string) => {
  return posts.filter((post) => post.category === categorySlug);
};

// 根据标签获取文章
export const getPostsByTag = (tag: string) => {
  return posts.filter((post) => 
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};

// 搜索文章
export const searchPosts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// 获取所有标签
export const getAllTags = () => {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

// 获取所有分类及其文章数
export const getCategoriesWithCount = () => {
  const categoryCount = new Map<string, number>();
  posts.forEach((post) => {
    const count = categoryCount.get(post.category) || 0;
    categoryCount.set(post.category, count + 1);
  });
  return categoryCount;
};
