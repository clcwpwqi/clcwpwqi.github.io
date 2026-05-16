# site.json 配置教程

## 文件作用

`site.json` 是博客的基础配置文件，包含站点名称、描述、作者信息、评论系统等核心配置。

## 完整配置示例

```json
{
  "title": "我的博客",
  "description": "一个简洁、现代的技术博客",
  "author": "张三",
  "email": "zhangsan@example.com",
  "github": "https://github.com/zhangsan",
  "twitter": "https://twitter.com/zhangsan",
  "logo": "Z",
  "url": "https://zhangsan.github.io",
  "favicon": "/favicon.ico",
  "avatar": {
    "src": "/images/avatar.png",
    "width": 200,
    "height": 200,
    "alt": "张三的头像"
  },
  "comment": {
    "provider": "giscus",
    "repo": "zhangsan/blog-comments",
    "repoId": "R_kgDOGxxxxxxxx",
    "category": "Announcements",
    "categoryId": "DIC_kwDOGxxxxxxxx",
    "mapping": "pathname",
    "reactionsEnabled": true,
    "emitMetadata": false,
    "theme": "preferred_color_scheme",
    "crossorigin": "anonymous"
  },
  "analytics": {
    "provider": "",
    "id": ""
  }
}
```

## 配置项说明

### 基础信息

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `title` | ✅ | 博客名称 | `"我的博客"` |
| `description` | ✅ | 博客描述（SEO用） | `"技术分享博客"` |
| `author` | ✅ | 作者名称 | `"张三"` |
| `email` | ❌ | 联系邮箱 | `"zhangsan@example.com"` |
| `github` | ❌ | GitHub 主页 | `"https://github.com/zhangsan"` |
| `twitter` | ❌ | Twitter 主页 | `"https://twitter.com/zhangsan"` |
| `logo` | ❌ | Logo 文字（单字符） | `"Z"` |
| `url` | ✅ | 博客完整 URL | `"https://zhangsan.github.io"` |
| `favicon` | ❌ | 网站图标路径 | `"/favicon.ico"` |

### 头像配置

```json
{
  "avatar": {
    "src": "/images/avatar.png",
    "width": 200,
    "height": 200,
    "alt": "博主头像"
  }
}
```

**图片尺寸建议**：
- 头像：200x200 像素
- 格式：PNG 或 JPG（确保扩展名与实际格式一致）
- 大小：建议小于 100KB

**⚠️ 常见坑**：文件扩展名与实际格式必须一致！例如 `avatar.png` 如果实际是 JPEG 格式，在某些浏览器中可能无法正确显示。可使用 `node scripts/resize-images.js --resize` 自动修复。

### 评论系统配置

本博客使用 [Giscus](https://giscus.app/) 作为评论系统，基于 GitHub Discussions。

#### 配置步骤

1. **创建评论仓库**
   - 在 GitHub 创建一个新仓库，如 `blog-comments`
   - 确保仓库是公开的
   - 在仓库设置中启用 Discussions 功能

2. **安装 Giscus App**
   - 访问 https://github.com/apps/giscus
   - 点击 "Install"
   - 选择你的评论仓库

3. **获取配置参数**
   - 访问 https://giscus.app/
   - 填写你的仓库名
   - 选择 Discussion 分类
   - 复制生成的配置参数

4. **填写配置**

```json
{
  "comment": {
    "provider": "giscus",
    "repo": "你的用户名/评论仓库名",
    "repoId": "R_kgDOGxxxxxxxx",
    "category": "Announcements",
    "categoryId": "DIC_kwDOGxxxxxxxx",
    "mapping": "pathname",
    "reactionsEnabled": true,
    "emitMetadata": false,
    "theme": "preferred_color_scheme",
    "crossorigin": "anonymous"
  }
}
```

**配置项说明**：

| 字段 | 说明 |
|------|------|
| `repo` | 仓库名，格式：`用户名/仓库名` |
| `repoId` | 从 giscus.app 获取 |
| `category` | Discussion 分类名称 |
| `categoryId` | 从 giscus.app 获取 |
| `mapping` | 页面与 Discussion 的映射方式 |
| `reactionsEnabled` | 是否启用表情反应 |
| `theme` | 主题，`preferred_color_scheme` 表示跟随系统 |

### 统计配置（可选）

```json
{
  "analytics": {
    "provider": "google",
    "id": "G-XXXXXXXXXX"
  }
}
```

## 常见问题

### Q: 修改后没有生效？

A: 需要重新构建并部署：
```bash
npm run build
# 然后部署到 GitHub Pages
```

### Q: 如何关闭评论？

A: 将 `comment.repo` 设为空字符串或删除该配置。

### Q: 头像图片放在哪里？

A: 放在 `public/images/` 目录下，如 `public/images/avatar.png`。
