---
title: "VS Code 效率提升指南"
slug: "vscode-productivity-guide"
excerpt: "发掘 VS Code 的强大功能，学习快捷键、插件和配置技巧，大幅提升编码效率。"
date: "2023-12-28"
updatedAt: "2023-12-30"
category: "tools"
tags: ["VS Code", "Tools", "Productivity"]
readingTime: 6
---

# VS Code 效率提升指南

Visual Studio Code 是目前最流行的代码编辑器之一。本文介绍如何通过各种技巧提升使用效率。

## 快捷键

### 基础快捷键

| 快捷键 | 功能 |
|--------|------|
| Cmd/Ctrl + P | 快速打开文件 |
| Cmd/Ctrl + Shift + P | 命令面板 |
| Cmd/Ctrl + , | 打开设置 |
| Cmd/Ctrl + B | 切换侧边栏 |
| Cmd/Ctrl + J | 切换面板 |

### 编辑快捷键

| 快捷键 | 功能 |
|--------|------|
| Cmd/Ctrl + D | 选中下一个相同词 |
| Cmd/Ctrl + Shift + L | 选中所有相同词 |
| Option/Alt + 点击 | 多光标 |
| Option/Alt + ↑/↓ | 移动行 |
| Option/Alt + Shift + ↑/↓ | 复制行 |
| Cmd/Ctrl + / | 注释切换 |
| Cmd/Ctrl + Shift + K | 删除行 |

### 导航快捷键

| 快捷键 | 功能 |
|--------|------|
| Cmd/Ctrl + G | 跳转到行 |
| Cmd/Ctrl + Shift + O | 跳转到符号 |
| Cmd/Ctrl + T | 工作区符号搜索 |
| Cmd/Ctrl + - | 返回上一位置 |
| Cmd/Ctrl + Shift + - | 前进 |

## 推荐插件

### 开发增强

1. **ES7+ React/Redux/React-Native snippets**
   - React 代码片段
   - 快速生成组件模板

2. **Auto Rename Tag**
   - 自动重命名配对标签
   - 修改开始标签，结束标签同步更新

3. **Bracket Pair Colorizer**
   - 括号配对着色
   - 提高代码可读性

4. **GitLens**
   - 增强 Git 功能
   - 显示代码作者、提交历史

### 代码质量

1. **ESLint**
   - JavaScript/TypeScript 代码检查
   - 自动修复问题

2. **Prettier**
   - 代码格式化
   - 统一代码风格

3. **Error Lens**
   - 内联显示错误和警告
   - 无需悬停查看

### 主题和外观

1. **Dracula Official**
   - 流行的暗色主题
   - 色彩舒适

2. **Material Icon Theme**
   - 文件图标主题
   - 丰富的文件类型图标

## 配置优化

### settings.json

```json
{
  // 编辑器
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code, JetBrains Mono, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  
  // 文件
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true
  },
  
  // 搜索
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  },
  
  // Git
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  
  // 终端
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.shell.osx": "/bin/zsh",
  
  // Emmet
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
```

## 代码片段

### 自定义代码片段

```json
// typescriptreact.json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "interface Props {",
      "  $1",
      "}",
      "",
      "export function Component({ $2 }: Props) {",
      "  return (",
      "    <div>",
      "      $3",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "Create a React functional component"
  }
}
```

## 调试配置

### launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## 高级功能

### 多根工作区

```json
// my-project.code-workspace
{
  "folders": [
    { "path": "frontend" },
    { "path": "backend" }
  ]
}
```

### 远程开发

1. **Remote - SSH**：连接到远程服务器
2. **Remote - Containers**：在容器内开发
3. **Remote - WSL**：在 WSL 中开发

## 总结

熟练掌握 VS Code 的快捷键和插件，能够显著提升开发效率。
