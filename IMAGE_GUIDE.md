# 图片使用指南

本文档说明博客中所有图片的位置、格式要求和尺寸建议。

---

## 1. 顶栏/底栏 Logo 图标

**位置**：`public/images/top.png`

**用途**：网站顶栏和底栏的博客 Logo 图标

| 属性 | 要求 |
|------|------|
| 格式 | PNG（推荐）、JPG、WebP |
| 尺寸 | 64×64 像素（推荐），最大 128×128 |
| 背景 | 透明背景（推荐）或纯色背景 |
| 文件大小 | 不超过 50KB |
| 显示方式 | 等比例缩放，object-fit: contain |

**配置方式**：在 `configs/navigation.json` 和 `configs/footer.json` 中设置 `brand.logoImage`

```json
{
  "brand": {
    "logoImage": "/images/top.png"
  }
}
```

---

## 2. 作者头像

**位置**：`public/images/avatar.png`

**用途**：关于页面的作者头像

| 属性 | 要求 |
|------|------|
| 格式 | PNG、JPG、WebP |
| 尺寸 | 200×200 像素（推荐），最小 100×100 |
| 形状 | 正方形或圆形均可（页面会自动裁剪为圆形） |
| 文件大小 | 不超过 200KB |
| 显示方式 | object-fit: cover，圆形裁剪 |

**配置方式**：在 `configs/about.json` 中设置 `profile.avatar`

```json
{
  "profile": {
    "avatar": "/images/avatar.png"
  }
}
```

---

## 3. 打赏二维码

**位置**：
- `public/images/wechat-pay.png` - 微信打赏码
- `public/images/alipay.png` - 支付宝打赏码

**用途**：关于页面"支持我"区域的打赏二维码

| 属性 | 要求 |
|------|------|
| 格式 | PNG（推荐） |
| 尺寸 | 200×200 像素（推荐），最小 150×150 |
| 背景 | 白色背景 |
| 文件大小 | 不超过 100KB |
| 显示方式 | 等比例缩放，object-fit: contain |

**配置方式**：在 `configs/about.json` 中设置 `support.methods`

```json
{
  "support": {
    "methods": [
      { "text": "微信打赏", "icon": "Heart", "image": "/images/wechat-pay.png" },
      { "text": "支付宝打赏", "icon": "Heart", "image": "/images/alipay.png" }
    ]
  }
}
```

---

## 4. 文章头图

**位置**：与文章 Markdown 文件同目录下的同名图片文件

**命名规则**：
- 文章文件：`/posts/frontend/react-guide.md`
- 头图文件：`/posts/frontend/react-guide.png`（同名，不同扩展名）
- 也支持 `.jpg`、`.jpeg`、`.webp`

**用途**：文章列表和详情页的封面图片

| 属性 | 要求 |
|------|------|
| 格式 | PNG、JPG、WebP |
| 尺寸 | 800×450 像素（16:9 推荐），最小 400×225 |
| 比例 | 16:9（推荐），页面会自动裁剪 |
| 文件大小 | 不超过 500KB |
| 显示方式 | object-fit: cover，保持比例裁剪 |

**优先级**：
1. 文章 frontmatter 中的 `cover` 字段
2. 同名图片文件（自动检测）
3. 默认无头图（显示文章标题首字母）

**示例**：
```markdown
---
title: "React 入门指南"
slug: "react-guide"
cover: "/images/custom-cover.png"  # 优先级最高
---
```

如果不设置 `cover`，则自动检测 `/posts/frontend/react-guide.png`

---

## 5. 通用图片处理规则

### 等比例缩放

所有图片默认使用 CSS `object-fit` 属性保持比例：

- **contain**：保持完整显示，可能有留白（用于 Logo、头像）
- **cover**：填满容器，可能裁剪（用于文章头图、背景图）

### 图片加载失败处理

所有图片都有错误处理：
- Logo：显示文字 Logo（首字母）
- 头像：显示文字头像（首字母）
- 文章头图：显示文章标题首字母作为占位符

### 懒加载

文章头图使用 `loading="lazy"` 懒加载，减少首屏加载时间。

---

## 6. 图片目录结构

```
public/
├── images/
│   ├── top.png           # 顶栏/底栏 Logo（64×64）
│   ├── avatar.png        # 作者头像（200×200）
│   ├── wechat-pay.png    # 微信打赏码（200×200）
│   ├── alipay.png        # 支付宝打赏码（200×200）
│   └── ...               # 其他图片
└── posts/               # 文章头图（自动复制）
    ├── frontend/
    │   └── react-guide.png
    └── backend/
        └── nodejs-guide.jpg
```

---

## 7. 快速参考

| 图片类型 | 推荐尺寸 | 推荐格式 | 最大文件大小 |
|----------|----------|----------|--------------|
| Logo 图标 | 64×64 | PNG | 50KB |
| 作者头像 | 200×200 | PNG/JPG | 200KB |
| 打赏二维码 | 200×200 | PNG | 100KB |
| 文章头图 | 800×450 | JPG/WebP | 500KB |
