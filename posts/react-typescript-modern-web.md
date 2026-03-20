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

使用 FC 类型或直接使用函数参数类型：

```tsx
import { FC } from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

// 方式一：使用 FC
export const UserCard: FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      {avatar && <img src={avatar} alt={name} />}
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// 方式二：直接定义（推荐）
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

### 事件处理

```tsx
// 按钮点击事件
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Clicked!', event.target);
};

// 输入框变化事件
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

// 表单提交事件
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // 处理提交
};
```

### useState 钩子

```tsx
// 基本类型
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('');
const [isActive, setIsActive] = useState<boolean>(false);

// 对象类型
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);

// 数组类型
const [items, setItems] = useState<string[]>([]);
```

### useRef 钩子

```tsx
// DOM 引用
const inputRef = useRef<HTMLInputElement>(null);

// 值引用（不触发重渲染）
const timerRef = useRef<number | null>(null);
```

## 高级模式

### 泛型组件

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// 使用
interface User {
  id: number;
  name: string;
}

<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
```

### 条件类型

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

## 最佳实践

1. **严格模式**：启用 `strict: true` 配置
2. **避免 any**：尽量使用具体类型
3. **类型推断**：让 TypeScript 自动推断简单类型
4. **接口优先**：使用 interface 定义对象形状
5. **类型导出**：公共类型应该导出

## 总结

React + TypeScript 的组合能够显著提高代码质量和开发效率。通过合理的类型定义，我们可以在编译时发现潜在问题，减少运行时错误。
