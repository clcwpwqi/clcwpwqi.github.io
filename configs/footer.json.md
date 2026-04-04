# footer.json 配置教程

## 文件作用

`footer.json` 配置页面底部的页脚内容，包括品牌信息、快速链接、联系方式、版权信息等。

## 完整配置示例

```json
{
  "brand": {
    "showLogo": true,
    "showDescription": true
  },
  "links": {
    "enabled": true,
    "title": "快速链接",
    "items": [
      { "label": "首页", "href": "/" },
      { "label": "分类", "href": "/categories" },
      { "label": "工具箱", "href": "/tools" },
      { "label": "关于", "href": "/about" }
    ]
  },
  "contact": {
    "enabled": true,
    "title": "联系方式",
    "showEmail": true,
    "showGithub": true,
    "showTwitter": true
  },
  "social": {
    "enabled": true,
    "items": [
      { "type": "github", "show": true },
      { "type": "twitter", "show": true },
      { "type": "email", "show": true },
      { "type": "rss", "show": true }
    ]
  },
  "copyright": {
    "enabled": true,
    "showYear": true,
    "customText": "",
    "showCredit": true
  }
}
```

## 配置项说明

### 品牌信息

```json
{
  "brand": {
    "showLogo": true,
    "showDescription": true
  }
}
```

| 字段 | 说明 |
|------|------|
| `showLogo` | 是否显示 Logo |
| `showDescription` | 是否显示博客描述 |

### 快速链接

```json
{
  "links": {
    "enabled": true,
    "title": "快速链接",
    "items": [
      { "label": "首页", "href": "/" },
      { "label": "分类", "href": "/categories" }
    ]
  }
}
```

### 联系方式

```json
{
  "contact": {
    "enabled": true,
    "title": "联系方式",
    "showEmail": true,
    "showGithub": true,
    "showTwitter": true
  }
}
```

### 社交媒体图标

```json
{
  "social": {
    "enabled": true,
    "items": [
      { "type": "github", "show": true },
      { "type": "twitter", "show": true },
      { "type": "email", "show": true },
      { "type": "rss", "show": true }
    ]
  }
}
```

**可用社交媒体类型**：

| 类型 | 说明 |
|------|------|
| `github` | GitHub |
| `twitter` | Twitter/X |
| `email` | 邮箱 |
| `rss` | RSS 订阅 |

### 版权信息

```json
{
  "copyright": {
    "enabled": true,
    "showYear": true,
    "customText": "保留所有权利",
    "showCredit": true
  }
}
```

| 字段 | 说明 |
|------|------|
| `enabled` | 是否显示版权信息 |
| `showYear` | 是否显示年份 |
| `customText` | 自定义版权文字（可选） |
| `showCredit` | 是否显示 "Made with..."  credits |

## 配置示例

### 示例 1：简化版页脚

```json
{
  "brand": {
    "showLogo": true,
    "showDescription": false
  },
  "links": {
    "enabled": false
  },
  "contact": {
    "enabled": false
  },
  "social": {
    "enabled": true
  },
  "copyright": {
    "showCredit": false
  }
}
```

### 示例 2：自定义版权文字

```json
{
  "copyright": {
    "enabled": true,
    "showYear": true,
    "customText": "本站内容采用 CC BY-NC-SA 4.0 许可协议",
    "showCredit": false
  }
}
```

### 示例 3：只显示部分社交图标

```json
{
  "social": {
    "enabled": true,
    "items": [
      { "type": "github", "show": true },
      { "type": "twitter", "show": false },
      { "type": "email", "show": true },
      { "type": "rss", "show": false }
    ]
  }
}
```
