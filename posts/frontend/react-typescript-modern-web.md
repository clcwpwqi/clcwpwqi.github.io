---
title: "使用 React 和 TypeScript 构建现代 Web 应用"
slug: "react-typescript-modern-web"
excerpt: "学习如何使用 React 和 TypeScript 构建类型安全、可维护的现代 Web 应用程序，包括最佳实践和常见模式。"
date: "2024-01-15"
updatedAt: "2024-01-20"
category: "frontend"
tags: ["React", "TypeScript", "Frontend"]
readingTime: 8
---

# 使用 React 和 TypeScript 构建现代 Web 应用

React 和 TypeScript 的组合已经成为现代前端开发的标准配置。TypeScript 提供了静态类型检查，而 React 提供了灵活的组件化开发模式。

## 为什么选择 TypeScript？

TypeScript 带来了诸多好处：

- **类型安全**：在编译时捕获错误
- **智能提示**：更好的 IDE 支持
- **可维护性**：代码更易理解和重构
- **文档化**：类型即文档

## 基础配置

首先，创建一个新的 React + TypeScript 项目：

```bash
npm create vite@latest my-app -- --template react-ts
```

## 组件定义

### 函数组件

```tsx
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

export function UserCard({ name, email, avatar }: UserCardProps) {
  return (
    <div className="user-card">
      {avatar && <img src={avatar} alt={name} />}
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
```

## 常用类型定义

### useState 钩子

```tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

## 最佳实践

1. **严格模式**：启用 strict: true 配置
2. **避免 any**：尽量使用具体类型
3. **类型推断**：让 TypeScript 自动推断简单类型

## 总结

React + TypeScript 的组合能够显著提高代码质量和开发效率。
