---
title: "Git 工作流与最佳实践"
slug: "git-workflow-best-practices"
excerpt: "掌握 Git 版本控制系统的高级用法，了解主流 Git 工作流和团队协作最佳实践。"
date: "2024-01-01"
updatedAt: "2024-01-03"
category: "best-practices"
tags: ["Git", "DevOps", "Best Practices"]
readingTime: 10
---

# Git 工作流与最佳实践

Git 是目前最流行的分布式版本控制系统。本文介绍 Git 的高级用法和团队协作最佳实践。

## Git 基础回顾

### 核心概念

- **工作区（Working Directory）**：实际文件
- **暂存区（Staging Area）**：准备提交的文件
- **本地仓库（Repository）**：完整的项目历史
- **远程仓库（Remote）**：共享的仓库

### 常用命令

```bash
# 基础操作
git add <file>          # 添加到暂存区
git commit -m "msg"     # 提交更改
git push                # 推送到远程
git pull                # 拉取更新

# 分支操作
git branch              # 列出分支
git branch <name>       # 创建分支
git checkout <name>     # 切换分支
git merge <name>        # 合并分支
```

## 分支策略

### Git Flow

经典的分支模型，适合发布周期明确的项目：

```
main        ●────────────────●────────────────●
             \\                /
develop       ●────●────●────●────●────●────●
                   \\    /\\    /
feature/a           ●────●    \\
feature/b                      ●────●
```

分支说明：
- `main`：生产分支，只接受合并
- `develop`：开发分支，集成所有功能
- `feature/*`：功能分支，从 develop 创建
- `release/*`：发布分支，准备新版本
- `hotfix/*`：热修复分支，修复生产问题

### GitHub Flow

简化的工作流，适合持续部署：

1. 从 `main` 创建功能分支
2. 提交更改
3. 创建 Pull Request
4. 代码审查
5. 合并到 `main`
6. 自动部署

### Trunk-Based Development

主干开发，所有开发者频繁向主干提交：

- 短生命周期的功能分支（< 1天）
- 特性开关控制功能可见性
- 持续集成，频繁合并

## 提交规范

### Conventional Commits

规范的提交信息格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

类型说明：
- `feat`：新功能
- `fix`：修复
- `docs`：文档
- `style`：格式（不影响代码运行）
- `refactor`：重构
- `test`：测试
- `chore`：构建/工具

示例：

```bash
git commit -m "feat(auth): add OAuth2 login support"
git commit -m "fix(api): resolve null pointer exception"
git commit -m "docs(readme): update installation guide"
```

## 高级技巧

### 交互式 Rebase

```bash
# 整理最近 3 次提交
git rebase -i HEAD~3

# 常用命令
pick    # 保留提交
reword  # 修改提交信息
squash  # 合并到上一个提交
fixup   # 合并并丢弃提交信息
drop    # 删除提交
```

### Stash 暂存

```bash
# 暂存当前更改
git stash push -m "work in progress"

# 查看 stash 列表
git stash list

# 恢复最近的 stash
git stash pop

# 恢复指定 stash
git stash apply stash@{1}
```

### Cherry Pick

```bash
# 挑选特定提交到当前分支
git cherry-pick <commit-hash>

# 挑选多个提交
git cherry-pick <hash1> <hash2>
```

### Bisect 二分查找

用于定位引入 bug 的提交：

```bash
git bisect start
git bisect bad          # 当前版本有问题
git bisect good v1.0    # v1.0 版本正常
# Git 自动 checkout 中间版本
git bisect good/bad     # 标记是否正常
# 重复直到找到问题提交
git bisect reset        # 结束查找
```

## 团队协作

### Pull Request 流程

1. **创建分支**：`git checkout -b feature/xxx`
2. **提交更改**：遵循提交规范
3. **推送分支**：`git push -u origin feature/xxx`
4. **创建 PR**：填写详细描述
5. **代码审查**：至少一人审查
6. **解决冲突**：如有需要
7. **合并分支**：使用 Squash 或 Merge

### 代码审查清单

- [ ] 代码符合项目规范
- [ ] 有足够的测试覆盖
- [ ] 文档已更新
- [ ] 没有明显的性能问题
- [ ] 安全性考虑到位

### 冲突解决

```bash
# 拉取最新代码
git fetch origin

# 尝试合并
git merge origin/main

# 解决冲突后标记为已解决
git add <resolved-file>

# 完成合并
git commit
```

## 钩子（Hooks）

### 常用钩子配置

```bash
# pre-commit：提交前检查
#!/bin/sh
npm run lint
npm run test

# commit-msg：验证提交信息
#!/bin/sh
commit_msg=$(cat $1)
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .+"; then
  echo "提交信息格式错误！"
  exit 1
fi
```

## 总结

良好的 Git 工作流能够提高团队协作效率，减少冲突和错误。选择适合团队的工作流，并严格执行提交规范，是项目成功的重要保障。
