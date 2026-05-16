# 配置文件说明

本目录包含博客的所有可配置项。修改这些 JSON 文件即可自定义博客的各种功能，无需修改代码。

## 配置文件列表

| 文件 | 说明 |
|------|------|
| `site.json` | 站点基础配置（名称、作者、评论系统等） |
| `homepage.json` | 首页配置（标题、副标题、精选文章等） |
| `about.json` | 关于页面配置（简介、联系方式、支持我、作者标签等） |
| `about/` | 关于页面 Markdown 内容文件（优先级高于 JSON） |
| `tools.json` | 工具箱页面配置（启用/禁用工具） |
| `footer.json` | 页脚配置（链接、版权信息、品牌图标等） |
| `navigation.json` | 导航栏配置（品牌图标、导航链接等） |

## 关于页面自定义内容

关于页面的"关于我"、"关于博客"、"技术栈"和"作者标签"内容支持通过 `configs/about/` 目录下的 Markdown 文件自定义编辑：

| 文件 | 内容 | 优先级 |
|------|------|--------|
| `about/about-me.md` | 关于我 | 高于 about.json 的 profile.bio |
| `about/about-blog.md` | 关于博客 | 高于 about.json 的 blog.content |
| `about/tech-stack.md` | 技术栈 | 高于 about.json 的 profile.skills |
| `about/author-tags.md` | 作者标签 | 新增功能，显示在头像和称号下方 |

修改后需要运行 `node scripts/build-about.js` 重新构建。

## 图片放置

所有图片文件必须放在 `public/images/` 目录下：

| 文件 | 要求 |
|------|------|
| `public/images/avatar.png` | 开发者头像，200×200px |
| `public/images/top.png` | 站点图标（顶栏/底栏），64×64px，PNG 透明背景 |
| `public/images/wechat-pay.png` | 微信收款码，宽度≤400px |
| `public/images/alipay.jpg` | 支付宝收款码，宽度≤400px |
| `public/images/其他图片` | 按需添加 |

**文章封面图片**：放在对应文章同目录下，需为同名 `.png` 文件。
例如：`posts/test/my-article.md` → `posts/test/my-article.png`

## 快速配置指南

### 1. 修改博客名称

编辑 `site.json`：
```json
{
  "title": "我的博客",
  "description": "这是我的个人博客"
}
```

### 2. 自定义顶栏/底栏图标

编辑 `navigation.json` 和 `footer.json`：
```json
{
  "brand": {
    "icon": "/images/top.png"
  }
}
```
将 64×64px 的 PNG 图标放入 `public/images/top.png`。

### 3. 修改关于页面

**方式 A（推荐）**：编辑 `configs/about/` 下的 Markdown 文件。

**方式 B（兼容）**：编辑 `configs/about.json`。

### 4. 添加作者标签

编辑 `configs/about/author-tags.md`：
```markdown
---
title: "作者标签"
order: 4
show: true
---

青年开发者
开源爱好者
技术分享者
```

### 5. 设置文章封面

在文章同目录下放置同名 `.png` 文件：
```
posts/frontend/
├── my-article.md
└── my-article.png    ← 自动匹配为封面
```

### 6. 添加/删除工具

编辑 `tools.json`，将 `enabled` 设为 `true` 或 `false`。

## 构建脚本

修改配置后需要运行相应的构建脚本：

```bash
# 构建文章数据
node scripts/build-posts.js

# 构建配置文件
node scripts/build-configs.js

# 构建关于页面内容（Markdown → JSON）
node scripts/build-about.js

# 检查图片规格
node scripts/resize-images.js

# 自动缩放不符合要求的图片
node scripts/resize-images.js --resize
```

## 详细教程

每个配置文件都有对应的详细教程：

- [site.json 配置教程](./site.json.md)
- [homepage.json 配置教程](./homepage.json.md)
- [about.json 配置教程](./about.json.md)
- [关于页面自定义教程](../关于页面自定义教程.md)
- [tools.json 配置教程](./tools.json.md)
- [footer.json 配置教程](./footer.json.md)
- [navigation.json 配置教程](./navigation.json.md)
- [图片指南](../图片指南.md)

## 注意事项

1. 修改配置后需要重新构建部署才能生效
2. JSON 格式必须正确，建议使用 JSON 验证工具检查
3. 图片路径建议使用相对路径，如 `/images/avatar.png`
4. **所有图片必须放在 `public/` 目录下**，不要放在根目录的 `images/`
5. 文章封面图片需与文章同名，放在同一分类目录下
