# navigation.json 配置教程

## 文件作用

`navigation.json` 配置顶部导航栏的链接和功能按钮。

## 完整配置示例

```json
{
  "items": [
    {
      "label": "首页",
      "href": "/",
      "show": true
    },
    {
      "label": "分类",
      "href": "/categories",
      "show": true
    },
    {
      "label": "工具箱",
      "href": "/tools",
      "show": true
    },
    {
      "label": "关于",
      "href": "/about",
      "show": true
    }
  ],
  "search": {
    "enabled": true
  },
  "themeToggle": {
    "enabled": true
  }
}
```

## 配置项说明

### 导航链接

```json
{
  "items": [
    {
      "label": "首页",
      "href": "/",
      "show": true
    }
  ]
}
```

| 字段 | 说明 |
|------|------|
| `label` | 链接文字 |
| `href` | 链接地址 |
| `show` | 是否显示 |

### 搜索按钮

```json
{
  "search": {
    "enabled": true
  }
}
```

### 主题切换按钮

```json
{
  "themeToggle": {
    "enabled": true
  }
}
```

## 配置示例

### 示例 1：添加新导航项

```json
{
  "items": [
    { "label": "首页", "href": "/", "show": true },
    { "label": "文章", "href": "/#latest", "show": true },
    { "label": "分类", "href": "/categories", "show": true },
    { "label": "工具箱", "href": "/tools", "show": true },
    { "label": "关于", "href": "/about", "show": true },
    { "label": "友链", "href": "/friends", "show": true }
  ]
}
```

### 示例 2：隐藏某些导航项

```json
{
  "items": [
    { "label": "首页", "href": "/", "show": true },
    { "label": "分类", "href": "/categories", "show": false },
    { "label": "工具箱", "href": "/tools", "show": true },
    { "label": "关于", "href": "/about", "show": true }
  ]
}
```

### 示例 3：关闭搜索功能

```json
{
  "search": {
    "enabled": false
  }
}
```

### 示例 4：关闭主题切换

```json
{
  "themeToggle": {
    "enabled": false
  }
}
```
