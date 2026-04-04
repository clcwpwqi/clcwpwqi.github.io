# homepage.json 配置教程

## 文件作用

`homepage.json` 配置首页的显示内容，包括 Hero 区域标题、副标题、按钮、精选文章等。

## 完整配置示例

```json
{
  "hero": {
    "title": "欢迎来到",
    "highlight": "我的技术博客",
    "subtitle": "分享前端、后端、DevOps 等技术文章，记录学习路上的点滴",
    "buttons": [
      {
        "label": "浏览文章",
        "href": "#latest",
        "variant": "primary",
        "icon": "Sparkles"
      },
      {
        "label": "开发工具",
        "href": "/tools",
        "variant": "secondary",
        "icon": "TrendingUp"
      }
    ]
  },
  "featured": {
    "enabled": true,
    "title": "精选文章",
    "posts": [
      "react-hooks-guide",
      "typescript-best-practices",
      "docker-tutorial"
    ]
  },
  "latest": {
    "title": "最新文章",
    "showCount": 6
  }
}
```

## 配置项说明

### Hero 区域

Hero 区域是首页顶部的标题区域。

```json
{
  "hero": {
    "title": "欢迎来到",
    "highlight": "我的技术博客",
    "subtitle": "分享前端、后端、DevOps 等技术文章...",
    "buttons": [...]
  }
}
```

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `title` | ✅ | 主标题（普通文字） | `"欢迎来到"` |
| `highlight` | ✅ | 高亮标题（渐变色） | `"我的技术博客"` |
| `subtitle` | ✅ | 副标题描述 | `"分享技术文章..."` |
| `buttons` | ❌ | 按钮配置 | 见下文 |

**按钮配置**：

```json
{
  "buttons": [
    {
      "label": "浏览文章",
      "href": "#latest",
      "variant": "primary",
      "icon": "Sparkles"
    },
    {
      "label": "开发工具",
      "href": "/tools",
      "variant": "secondary",
      "icon": "TrendingUp"
    }
  ]
}
```

| 字段 | 说明 |
|------|------|
| `label` | 按钮文字 |
| `href` | 链接地址（可以是 `#id` 锚点或页面路径） |
| `variant` | 按钮样式：`primary`（主色）或 `secondary`（次要） |
| `icon` | 图标名称（Lucide 图标） |

**可用图标**：
- `Sparkles` - 星星
- `TrendingUp` - 上升箭头
- `BookOpen` - 书本
- `Code` - 代码
- `Wrench` - 工具
- `ArrowRight` - 右箭头

### 精选文章

```json
{
  "featured": {
    "enabled": true,
    "title": "精选文章",
    "posts": [
      "react-hooks-guide",
      "typescript-best-practices",
      "docker-tutorial"
    ]
  }
}
```

| 字段 | 说明 |
|------|------|
| `enabled` | 是否显示精选文章区域 |
| `title` | 区域标题 |
| `posts` | 文章 slug 列表（按顺序显示） |

**如何获取文章 slug？**

文章 slug 是文章文件名（不含 `.md` 后缀），如：
- 文件：`posts/frontend/react-hooks-guide.md`
- slug：`react-hooks-guide`

### 最新文章

```json
{
  "latest": {
    "title": "最新文章",
    "showCount": 6
  }
}
```

| 字段 | 说明 |
|------|------|
| `title` | 区域标题 |
| `showCount` | 显示的文章数量 |

## 配置示例

### 示例 1：个人博客风格

```json
{
  "hero": {
    "title": "你好，我是",
    "highlight": "张三",
    "subtitle": "一名热爱技术的全栈开发者，在这里分享我的学习心得和技术经验",
    "buttons": [
      {
        "label": "阅读文章",
        "href": "#latest",
        "variant": "primary",
        "icon": "BookOpen"
      },
      {
        "label": "了解更多",
        "href": "/about",
        "variant": "secondary",
        "icon": "ArrowRight"
      }
    ]
  }
}
```

### 示例 2：技术团队博客

```json
{
  "hero": {
    "title": "",
    "highlight": "技术团队博客",
    "subtitle": "分享我们在前端、后端、DevOps 等领域的技术实践和经验总结",
    "buttons": [
      {
        "label": "浏览文章",
        "href": "#latest",
        "variant": "primary",
        "icon": "Sparkles"
      },
      {
        "label": "关于我们",
        "href": "/about",
        "variant": "secondary",
        "icon": "Users"
      }
    ]
  }
}
```

### 示例 3：关闭精选文章

```json
{
  "featured": {
    "enabled": false
  }
}
```

## 常见问题

### Q: 如何修改标题的渐变色？

A: 渐变色在代码中定义，如需修改请编辑 `src/pages/HomePage.tsx` 中的 `bg-gradient-to-r from-blue-600 to-purple-600`。

### Q: 可以添加更多按钮吗？

A: 可以，在 `buttons` 数组中添加更多对象即可。

### Q: 精选文章不显示？

A: 检查：
1. `enabled` 是否为 `true`
2. 文章 slug 是否正确
3. 文章是否存在于 `posts/` 目录下
