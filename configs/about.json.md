# about.json 配置教程

## 文件作用

`about.json` 配置关于页面的所有内容，包括个人简介、联系方式、支持我页面等。

## 完整配置示例

```json
{
  "hero": {
    "title": "关于我",
    "subtitle": "全栈开发者，热爱开源，喜欢分享技术文章和开发经验"
  },
  "profile": {
    "name": "张三",
    "role": "全栈开发者",
    "bio": "我是一名热爱技术的全栈开发者...",
    "avatar": "/images/avatar.png",
    "skills": ["React", "TypeScript", "Node.js"]
  },
  "contacts": {
    "items": [
      {
        "type": "github",
        "label": "GitHub",
        "value": "zhangsan",
        "url": "https://github.com/zhangsan",
        "icon": "Github",
        "show": true
      }
    ]
  },
  "support": {
    "enabled": true,
    "title": "支持我",
    "description": "如果我的文章对你有帮助...",
    "methods": [...]
  },
  "blog": {
    "enabled": true,
    "title": "关于博客",
    "content": "..."
  },
  "stats": {
    "enabled": true
  }
}
```

## 配置项说明

### Hero 区域

```json
{
  "hero": {
    "title": "关于我",
    "subtitle": "全栈开发者，热爱开源..."
  }
}
```

### 个人资料

```json
{
  "profile": {
    "name": "张三",
    "role": "全栈开发者",
    "bio": "个人简介...",
    "avatar": "/images/avatar.png",
    "skills": ["React", "TypeScript", "Node.js"]
  }
}
```

| 字段 | 说明 |
|------|------|
| `name` | 姓名 |
| `role` | 职位/角色 |
| `bio` | 个人简介（支持换行 `\n\n`） |
| `avatar` | 头像图片路径 |
| `skills` | 技能标签列表 |

### 联系方式

```json
{
  "contacts": {
    "items": [
      {
        "type": "github",
        "label": "GitHub",
        "value": "zhangsan",
        "url": "https://github.com/zhangsan",
        "icon": "Github",
        "show": true
      },
      {
        "type": "twitter",
        "label": "Twitter",
        "value": "@zhangsan",
        "url": "https://twitter.com/zhangsan",
        "icon": "Twitter",
        "show": true
      },
      {
        "type": "email",
        "label": "邮箱",
        "value": "zhangsan@example.com",
        "url": "mailto:zhangsan@example.com",
        "icon": "Mail",
        "show": true
      },
      {
        "type": "telegram",
        "label": "Telegram",
        "value": "@zhangsan",
        "url": "https://t.me/zhangsan",
        "icon": "Send",
        "show": false
      },
      {
        "type": "wechat",
        "label": "微信公众号",
        "value": "张三的技术博客",
        "url": "",
        "icon": "MessageSquare",
        "show": false
      }
    ]
  }
}
```

**可用联系方式类型**：

| 类型 | 图标 | 说明 |
|------|------|------|
| `github` | Github | GitHub 主页 |
| `twitter` | Twitter | Twitter/X 主页 |
| `email` | Mail | 电子邮箱 |
| `telegram` | Send | Telegram |
| `wechat` | MessageSquare | 微信公众号 |
| `qq` | MessageCircle | QQ 号码 |
| `phone` | Phone | 电话号码 |
| `website` | Globe | 个人网站 |
| `rss` | Rss | RSS 订阅 |

**添加自定义联系方式**：

```json
{
  "type": "custom",
  "label": "掘金",
  "value": "@zhangsan",
  "url": "https://juejin.cn/user/xxx",
  "icon": "ExternalLink",
  "show": true
}
```

### 支持我页面

```json
{
  "support": {
    "enabled": true,
    "title": "支持我",
    "description": "如果我的文章对你有帮助，欢迎通过以下方式支持我：",
    "methods": [
      {
        "icon": "Heart",
        "text": "在 GitHub 上 Star 这个项目"
      },
      {
        "icon": "Share2",
        "text": "分享文章给更多开发者"
      },
      {
        "icon": "MessageCircle",
        "text": "在评论区留下你的反馈"
      }
    ],
    "donate": {
      "enabled": true,
      "title": "请我喝杯咖啡",
      "description": "如果我的文章帮助到了你...",
      "methods": [
        {
          "name": "支付宝",
          "image": "/images/donate-alipay.png"
        },
        {
          "name": "微信",
          "image": "/images/donate-wechat.png"
        }
      ]
    }
  }
}
```

**捐赠图片尺寸建议**：
- 尺寸：200x200 像素
- 格式：PNG（支持透明背景）
- 用途：支付宝/微信收款码

### 博客介绍

```json
{
  "blog": {
    "enabled": true,
    "title": "关于博客",
    "content": "{title} 是一个基于 React + TypeScript..."
  }
}
```

**特殊占位符**：
- `{title}` - 会自动替换为博客名称

### 统计数据

```json
{
  "stats": {
    "enabled": true
  }
}
```

显示文章数、分类数、标签数。

## 配置示例

### 示例 1：个人开发者

```json
{
  "profile": {
    "name": "张三",
    "role": "前端工程师",
    "bio": "5年前端开发经验，专注于 React 生态。热爱开源，喜欢分享技术心得。",
    "avatar": "/images/avatar.png",
    "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  "contacts": {
    "items": [
      { "type": "github", "value": "zhangsan", "show": true },
      { "type": "twitter", "value": "@zhangsan", "show": true },
      { "type": "email", "value": "zhangsan@example.com", "show": true },
      { "type": "wechat", "value": "张三的技术分享", "show": true }
    ]
  }
}
```

### 示例 2：关闭捐赠

```json
{
  "support": {
    "enabled": true,
    "donate": {
      "enabled": false
    }
  }
}
```

### 示例 3：关闭整个支持区域

```json
{
  "support": {
    "enabled": false
  }
}
```

### 示例 4：作者标签

```json
{
  "authorTags": {
    "enabled": true,
    "title": "作者标签",
    "tags": ["青年开发者", "开源爱好者", "技术分享者", "全栈开发者"]
  }
}
```

作者标签显示在关于页面作者头像和称号下方，以彩色标签形式展示。

---

## ⚡ 推荐使用 Markdown 文件

关于页面的核心内容（关于我、关于博客、技术栈、作者标签）推荐使用 `configs/about/` 目录下的 Markdown 文件编辑，优先级高于 about.json：

| MD 文件 | 对应内容 |
|---------|---------|
| `about/about-me.md` | 关于我 |
| `about/about-blog.md` | 关于博客 |
| `about/tech-stack.md` | 技术栈 |
| `about/author-tags.md` | 作者标签 |

修改后运行 `node scripts/build-about.js` 重新构建。详见 [关于页面自定义教程](../关于页面自定义教程.md)。
