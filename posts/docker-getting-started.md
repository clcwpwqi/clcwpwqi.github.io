---
title: "Docker 入门到实践：容器化你的应用"
slug: "docker-getting-started"
excerpt: "学习 Docker 容器技术，了解如何构建、运行和部署容器化应用，提升开发和部署效率。"
date: "2024-01-05"
updatedAt: "2024-01-08"
category: "devops"
tags: ["Docker", "DevOps", "Container"]
readingTime: 12
---

# Docker 入门到实践：容器化你的应用

Docker 是一个开源的容器化平台，它让开发者能够将应用及其依赖打包到一个轻量级、可移植的容器中。

## 什么是 Docker？

Docker 解决了"在我机器上能运行"的问题：

- **容器化**：应用和依赖一起打包
- **一致性**：开发、测试、生产环境一致
- **隔离性**：每个容器独立运行
- **轻量级**：比虚拟机更高效

## 核心概念

### 镜像（Image）

镜像是只读的模板，包含运行应用所需的代码、库、环境变量和配置文件。

### 容器（Container）

容器是镜像的运行实例，可以被创建、启动、停止、删除。

### Dockerfile

Dockerfile 是构建镜像的脚本文件。

## 安装 Docker

### macOS

```bash
brew install --cask docker
```

### Ubuntu

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## 基础命令

### 镜像管理

```bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx
```

### 容器操作

```bash
# 运行容器
docker run -d -p 80:80 --name my-nginx nginx

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop my-nginx

# 启动容器
docker start my-nginx

# 删除容器
docker rm my-nginx

# 进入容器
docker exec -it my-nginx /bin/bash
```

## Dockerfile 编写

### 基础示例

```dockerfile
# 基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]
```

### 多阶段构建

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

## Docker Compose

使用 Docker Compose 管理多容器应用：

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Compose 命令

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重建镜像
docker-compose up -d --build
```

## 最佳实践

### 镜像优化

1. **使用小体积基础镜像**：alpine 版本
2. **多阶段构建**：分离构建和运行环境
3. **层缓存优化**：将不常改变的指令放在前面
4. **.dockerignore**：排除不需要的文件

```
node_modules
.git
.env
*.md
```

### 安全实践

1. **不以 root 运行**：

```dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
```

2. **扫描镜像漏洞**：

```bash
docker scan myimage:latest
```

## 实战部署

### 部署到云服务器

```bash
# 1. 构建镜像
docker build -t myapp:latest .

# 2. 保存镜像
docker save myapp:latest > myapp.tar

# 3. 传输到服务器
scp myapp.tar user@server:/tmp/

# 4. 在服务器加载镜像
docker load < /tmp/myapp.tar

# 5. 运行
docker run -d -p 80:3000 --name myapp myapp:latest
```

## 总结

Docker 简化了应用的打包和部署流程，确保环境一致性。配合 Docker Compose，可以轻松管理复杂的多容器应用。
