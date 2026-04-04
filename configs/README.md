# 配置文件说明

本目录包含博客的所有可配置项。修改这些 JSON 文件即可自定义博客的各种功能，无需修改代码。

## 配置文件列表

| 文件 | 说明 |
|------|------|
| `site.json` | 站点基础配置（名称、作者、评论系统等） |
| `homepage.json` | 首页配置（标题、副标题、精选文章等） |
| `about.json` | 关于页面配置（简介、联系方式、支持我等） |
| `tools.json` | 工具箱页面配置（启用/禁用工具） |
| `footer.json` | 页脚配置（链接、版权信息等） |
| `navigation.json` | 导航栏配置 |

## 快速配置指南

### 1. 修改博客名称

编辑 `site.json`：
```json
{
  "title": "我的博客",
  "description": "这是我的个人博客"
}
```

### 2. 修改首页标题

编辑 `homepage.json`：
```json
{
  "hero": {
    "title": "欢迎来到",
    "highlight": "我的博客",
    "subtitle": "这里是我的个人技术分享空间"
  }
}
```

### 3. 配置评论系统

编辑 `site.json` 中的 `comment` 部分：
```json
{
  "comment": {
    "repo": "你的用户名/你的仓库名",
    "repoId": "从 giscus.app 获取",
    "categoryId": "从 giscus.app 获取"
  }
}
```

### 4. 修改关于页面

编辑 `about.json`：
```json
{
  "profile": {
    "name": "你的名字",
    "bio": "你的个人简介"
  },
  "contacts": {
    "items": [
      {
        "type": "github",
        "value": "你的GitHub用户名",
        "show": true
      }
    ]
  }
}
```

### 5. 添加/删除工具

编辑 `tools.json`，将 `enabled` 设为 `true` 或 `false`：
```json
{
  "tools": [
    {
      "id": "json-formatter",
      "enabled": true
    },
    {
      "id": "qr-code",
      "enabled": false
    }
  ]
}
```

### 6. 设置精选文章

编辑 `homepage.json`：
```json
{
  "featured": {
    "posts": [
      "文章slug-1",
      "文章slug-2",
      "文章slug-3"
    ]
  }
}
```

## 详细教程

每个配置文件都有对应的详细教程：

- [site.json 配置教程](./site.json.md)
- [homepage.json 配置教程](./homepage.json.md)
- [about.json 配置教程](./about.json.md)
- [tools.json 配置教程](./tools.json.md)
- [footer.json 配置教程](./footer.json.md)
- [navigation.json 配置教程](./navigation.json.md)

## 注意事项

1. 修改配置后需要重新构建部署才能生效
2. JSON 格式必须正确，建议使用 JSON 验证工具检查
3. 图片路径建议使用相对路径，如 `/images/avatar.png`
