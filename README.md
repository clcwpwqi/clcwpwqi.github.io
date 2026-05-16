# clc'blog - 静态博客项目

基于 React 18 + TypeScript + Vite + Tailwind CSS 的个人博客，可部署到 GitHub Pages。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
├── .github/workflows/deploy.yml  # GitHub Actions 自动部署
├── configs/                      # 所有配置文件
│   ├── site.json                 # 站点基本信息
│   ├── navigation.json           # 导航栏配置
│   ├── homepage.json             # 首页配置
│   ├── about.json                # 关于页配置
│   ├── footer.json               # 页脚配置
│   ├── tools.json                # 工具箱配置
│   └── about/                    # 关于页 Markdown 内容
├── posts/                        # 文章目录
│   ├── labels.json               # 标签配置
│   └── frontend/                 # 分类文件夹
│       ├── frontend.json         # 分类配置
│       └── article.md            # 文章（Markdown）
├── public/images/                # 全局图片
├── scripts/                      # 构建脚本
├── src/                          # 源代码
│   ├── components/               # 组件
│   ├── pages/                    # 页面
│   ├── data/                     # 数据层
│   ├── types/                    # 类型定义
│   └── utils/                    # 工具函数
└── package.json
```

## 如何新增文章

1. 在 `posts/` 下找到或创建分类文件夹（如 `posts/frontend/`）
2. 创建 `[分类名].json` 分类配置（如果该分类是新的）：
   ```json
   { "id": "frontend", "name": "前端开发", "slug": "frontend", "description": "描述", "order": 1 }
   ```
3. 创建文章 `.md` 文件，包含 frontmatter：
   ```yaml
   ---
   title: "文章标题"
   slug: "article-slug"
   excerpt: "摘要"
   date: "2024-01-15"
   category: "frontend"
   tags: ["React", "TypeScript"]
   readingTime: 8
   ---

   文章内容...
   ```
4. 可选：放置同名图片 `article-slug.png` 作为文章头图

## 如何新增分类和标签

### 新增分类
在 `posts/` 下创建新文件夹，添加 `[分类名].json` 配置文件。

### 新增标签
在 `posts/labels.json` 中添加标签：
```json
{
  "Vue": { "id": "vue", "name": "Vue", "slug": "vue", "color": "#42B883" }
}
```
未在 labels.json 中定义的标签会使用默认蓝色 `#3B82F6`。

## 如何配置评论系统（Giscus）

在 `configs/site.json` 中配置：

```json
{
  "comment": {
    "provider": "giscus",
    "repo": "你的GitHub用户名/仓库名",
    "repoId": "仓库ID（从 https://giscus.app/zh-CN 获取）",
    "category": "讨论分类名称",
    "categoryId": "分类ID"
  }
}
```

获取配置值的步骤：
1. 访问 https://giscus.app/zh-CN
2. 输入你的仓库信息
3. 选择讨论分类
4. 复制生成的配置值

## 图片规范

| 图片类型 | 路径 | 推荐尺寸 | 格式 |
|---------|------|---------|------|
| 顶栏图标 | `public/images/top.png` | 64×64 | PNG |
| 作者头像 | `public/images/avatar.png` | 200×200 | PNG |
| 微信打赏码 | `public/images/wechat-pay.png` | 200×200 | PNG |
| 支付宝打赏码 | `public/images/alipay.png` | 200×200 | PNG |
| 文章头图 | `posts/[分类]/[文章名].png` | 800×450 | JPG/PNG/WebP |

文章头图优先级：`frontmatter.cover` > 同名图片 > 无头图

## 配置文件说明

所有自定义内容通过 `/configs/` 下的 JSON 文件管理，修改后运行 `npm run dev` 或 `npm run build` 即可生效。

## GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 确保分支名为 `main`
3. 在仓库 Settings → Pages 中启用 GitHub Actions 部署
4. 每次 push 到 main 分支会自动构建部署

项目使用 `HashRouter`，无需 404.html 重定向方案。
