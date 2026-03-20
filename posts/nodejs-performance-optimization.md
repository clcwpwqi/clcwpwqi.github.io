---
title: "Node.js 性能优化实践"
slug: "nodejs-performance-optimization"
excerpt: "深入了解 Node.js 性能优化技巧，包括内存管理、异步处理、缓存策略等实战方案。"
date: "2023-12-20"
updatedAt: "2023-12-25"
category: "backend"
tags: ["Node.js", "Backend", "Performance"]
readingTime: 15
---

# Node.js 性能优化实践

Node.js 以其高性能和事件驱动模型著称，但不当的使用方式也会导致性能问题。本文介绍实用的优化技巧。

## 性能分析工具

### 内置工具

```bash
# Node.js 内置分析器
node --prof app.js
node --prof-process isolate-0x*.log > profile.txt

# 性能钩子
node --perf-basic-prof app.js
```

### Clinic.js

```bash
npm install -g clinic

# 医生模式 - 全面诊断
clinic doctor -- node app.js

# 火焰图 - CPU 分析
clinic flame -- node app.js
```

## 代码级优化

### 1. 避免阻塞事件循环

```javascript
// 阻塞操作
app.get('/slow', (req, res) => {
  const result = heavyComputation();
  res.json(result);
});

// 使用 worker_threads
const { Worker } = require('worker_threads');

app.get('/fast', async (req, res) => {
  const worker = new Worker('./worker.js');
  worker.postMessage(data);
  worker.on('message', (result) => {
    res.json(result);
  });
});
```

### 2. 优化异步操作

```javascript
// 串行执行
for (const id of ids) {
  await fetchUser(id);
}

// 并行执行
await Promise.all(ids.map(id => fetchUser(id)));

// 控制并发数
const pLimit = require('p-limit');
const limit = pLimit(5);
await Promise.all(ids.map(id => limit(() => fetchUser(id))));
```

### 3. 使用流处理大数据

```javascript
// 内存中处理大文件
const data = fs.readFileSync('large-file.txt');
processData(data);

// 使用流
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(transformStream).pipe(writeStream);
```

## 内存优化

### 避免内存泄漏

```javascript
// 事件监听器泄漏
class Emitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
}

// 限制监听器数量
class Emitter {
  constructor() {
    this.events = new Map();
    this.maxListeners = 10;
  }
  
  on(event, listener) {
    const listeners = this.events.get(event) || [];
    if (listeners.length >= this.maxListeners) {
      listeners.shift();
    }
    listeners.push(listener);
    this.events.set(event, listeners);
  }
}
```

## 缓存策略

### 内存缓存

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

async function getUser(id) {
  const cached = cache.get('user:' + id);
  if (cached) return cached;
  
  const user = await db.users.findById(id);
  cache.set('user:' + id, user);
  return user;
}
```

### Redis 缓存

```javascript
const Redis = require('ioredis');
const redis = new Redis();

async function getCachedData(key, fetchFn, ttl = 3600) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}
```

## 集群部署

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log('Worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
} else {
  require('./app.js');
}
```

## 总结

Node.js 性能优化是一个持续的过程。通过使用正确的工具进行分析，针对性地优化代码，可以显著提升应用性能。
