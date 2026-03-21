---
title: "CMS-2026 加密算法"
slug: "cms-2026-ea"
excerpt: "文章摘要，显示在列表中"
date: "2026-3-21"
category: "frontend"
tags: ["HTML", "CMS-2026"]
readingTime: 10
---

# CMS-2026 Encryption Algorithm

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-success)
![Platform](https://img.shields.io/badge/Platform-Web_Crypto_API-orange)

**CMS-2026** 是一种基于现代浏览器原生的 Web Crypto API 构建的高强度加解密算法方案。它专为处理复杂的 Unicode 字符（如中文、Emoji）设计。

---

## 原理实现

CMS-2026 不依赖任何外部第三方数学库，完全利用硬件级加速的浏览器底层 API。

### 核心实现
算法遵循 **PBKDF2 → AES-256-GCM** 的安全链路：

* **密钥:** 使用 $PBKDF2$ (Password-Based Key Derivation Function 2) 算法。通过随机生成的 Salt与 $100,000$ 次 $SHA-256$ 迭代，将用户密码转化为 256 位的强加密密钥。
* **加密模式:** 采用 **AES-GCM** (Galois/Counter Mode)。与传统的 CBC 模式不同，GCM 提供“关联数据的认证加密”，能同时保证数据的机密性与完整性，防止密文被篡改。
* **编码转换:** 通过 `TextEncoder` 将 Unicode 字符串转为 `Uint8Array`，确保所有特殊符号无损。

### 报文结构
加密后的数据包含三部分：
`[16字节 Salt] + [12字节 IV] + [加密后的 Ciphertext]`

---

## 支持情况

| 类型        | 支持范围                                  | 备注    |
| :-------- | :------------------------------------ | :---- |
| **语言**    | 中文、英文等所有 Unicode                      | 无乱码   |
| **符号**    | 特殊符号、数学公式、空格                          | 完美保留  |
| **Emoji** | 🌈, 🚀, 🐱‍👤 等复杂组合 Emoji             | 正常加解密 |
| **环境**    | Chrome, Edge, Safari, Android WebView | 正常支持  |

---

## 免责声明
此算法加密能力较弱，为HTML学习中的练习作品，且为开源算法，**请勿**在包括但不限于商业机密、密码保存、隐私数据、机密数据等方面使用本算法。使用本算法造成的包括但不限于机密泄露、隐私泄露、密码丢失等问题算法作者不承担任何责任。

## 快速开始

#### 安装
直接引用 `CMS2026.js` 到你的项目中。

#### 示例代码
```javascript
const cms = new CMS2026();

// 加密
const cipher = await cms.encrypt("你好 🚀 CMS-2026", "your_password");

// 解密
const plain = await cms.decrypt(cipher, "your_password");