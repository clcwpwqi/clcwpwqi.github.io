# Markdown 文章模板

## 文件命名规范
- 使用英文、数字、连字符 `-` 命名
- 例如：`my-first-post.md`, `react-hooks-guide.md`

## Frontmatter 头部格式

```yaml
---
title: "文章标题"
slug: "article-slug"           # URL 友好的标识，如 react-hooks-guide
excerpt: "文章摘要，显示在列表中"
date: "2024-01-15"             # 发布日期 YYYY-MM-DD
updatedAt: "2024-01-20"        # 更新日期（可选）
category: "frontend"           # 分类 slug
tags: ["React", "Hooks"]       # 标签数组
readingTime: 8                 # 预计阅读时间（分钟）
---
```

## 可用分类

| slug | 名称 |
|------|------|
| frontend | 前端开发 |
| backend | 后端开发 |
| devops | DevOps |
| tools | 工具效率 |
| best-practices | 最佳实践 |

## 完整示例

```markdown
---
title: "使用 React Hooks 的最佳实践"
slug: "react-hooks-best-practices"
excerpt: "深入理解 React Hooks，学习如何正确使用 useState、useEffect 等常用 Hooks"
date: "2024-01-15"
category: "frontend"
tags: ["React", "Hooks", "JavaScript"]
readingTime: 10
---

# 使用 React Hooks 的最佳实践

## 什么是 Hooks

Hooks 是 React 16.8 引入的新特性...

## useState 使用技巧

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

## 总结

...
```

## Markdown 语法支持

- 标题: `# ## ###`
- 代码块: \`\`\`language
- 表格: `| 列1 | 列2 |`
- 列表: `-` 或 `1.`
- 引用: `>`
- 链接: `[文本](url)`
- 图片: `![alt](url)`
