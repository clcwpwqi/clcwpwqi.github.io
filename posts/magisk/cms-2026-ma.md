---
title: "CMS-2026 Magisk"
slug: "cms-2026-ma"
excerpt: "Magisk 模块实现"
date: "2026-3-21"
category: "magisk"
tags: ["Magisk", "CMS-2026"]
readingTime: 10
---

# CMS-2026 Magisk Module

![Magisk](https://img.shields.io/badge/Magisk-v24.0+-red)
![System](https://img.shields.io/badge/System-Android-3DDC84)

将 **CMS-2026** 加解密算法带入KernelSU、APatch、Magisk等管理器中，点击WebUI即可直接打开加解密页面

---

## 功能介绍

* **[开发中]系统级注入:** 将加密工具集成至 `/system/bin/`。
* **[开发中]CLI 支持:** 通过终端（Termux 或 ADB Shell）输入 `cms2026` 即可调用。
* **WebUI支持:** 直接打开WebUI即可使用

---

## 安装指南

1.  在 [Releases](https://github.com/clcwpwqi/CMS-2026-Magisk/releases) 页面下载最新的 `.zip` 模块文件。
2.  打开 Root管理器
3.  点击 `模块` -> `从本地安装`。
4.  选择下载的 zip 文件并重启手机。

---

## 使用方法

#### [开发中]命令行用法：

安装完成后，打开终端输入：

```bash
# 加密字符串
cms2026 -e "待加密内容" -p "我的密码"

# 解密字符串
cms2026 -d "密文内容" -p "我的密码"

# 强加密模式 (自定义 密钥)
cms2026 -e "内容" -p "密码" --strong

```

#### WebUI用法

* 安装完成后，Magisk用户需要使用类似于[KsuWebUI](https://github.com/5ec1cff/KsuWebUIStandalone/releases/download/v1.0/KsuWebUI-1.0-34-release.apk)等应用打开WebUI界面，APatch和KernelSU用户直接点击WebUI按钮即可打开。
* [界面截图](https://github.com/CMS-2026-Magisk/photo/webui.jpg)

---

## 支持情况

| 类型        | 支持范围                                  
| :-------- | :------------------------------------ 
| **Root方式**    | KernelSU、APatch、Magisk                      | 
| **安卓版本**    | Android 8及以上                         |
| **管理器版本** | KSU v0.8.0及以上  AP v10957及以上 |

---

## 注意事项

 * 请务必妥善保管你的自定义密钥，强加密模式下遗失密码将无法找回加密数据。
 * 本模块处于开发状态，目前(v1.0.0)原理上没有修改系统内容，不会导致不开机等系统问题。
 * 本模块刷入需要Root，请在刷入前备份boot/init_boot等重要分区以及基带、个人数据等，对于刷机操作失误、设备类型不匹配、自身系统bug等导致的数据丢失、系统损坏、设备无法开机等问题不提供维修支持，不承担任何责任。
 
---

## 问题排查解决
* 如果刷入后导致不开机，请使用TWRP的第三方recovery删除 **/data/adb/modules/cms_2026_magisk** 下全部内容；或使用fastboot等刷入备份好的boot/init_boot
* 如果开机后没有WebUI选项，Magisk用户请安装[KsuWebUI](https://github.com/5ec1cff/KsuWebUIStandalone/releases/download/v1.0/KsuWebUI-1.0-34-release.apk)，KernelSU和APatch用户请检查管理器版本是否符合要求
* 若打开WebUI页面后出现使用功能问题，请携带完整复现步骤、录屏以及日志提交issue

---

## 关联项目
* **算法底层:** [CMS-2026](https://github.com/clcwpwqi/CMS-2026)
* **网页版:** [CMS-2026-WEB](https://github.com/clcwpwqi/CMS-2026-WEB)