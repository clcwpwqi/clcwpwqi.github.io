# tools.json 配置教程

## 文件作用

`tools.json` 配置工具箱页面显示的工具列表，可以启用/禁用现有工具或添加新工具。

## 完整配置示例

```json
{
  "title": "开发者工具箱",
  "subtitle": "实用的纯前端开发工具，无需后端服务，数据完全在本地处理，安全高效",
  "tools": [
    {
      "id": "json-formatter",
      "name": "JSON 格式化",
      "description": "格式化、验证、压缩 JSON 数据",
      "icon": "Braces",
      "component": "JsonFormatter",
      "enabled": true,
      "color": "from-blue-500 to-cyan-500"
    }
  ]
}
```

## 配置项说明

### 页面标题

```json
{
  "title": "开发者工具箱",
  "subtitle": "实用的纯前端开发工具..."
}
```

### 工具配置

```json
{
  "tools": [
    {
      "id": "json-formatter",
      "name": "JSON 格式化",
      "description": "格式化、验证、压缩 JSON 数据",
      "icon": "Braces",
      "component": "JsonFormatter",
      "enabled": true,
      "color": "from-blue-500 to-cyan-500"
    }
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 工具唯一标识 |
| `name` | ✅ | 工具名称 |
| `description` | ✅ | 工具描述 |
| `icon` | ✅ | 图标名称（Lucide 图标） |
| `component` | ✅ | 组件名称（需已存在） |
| `enabled` | ✅ | 是否启用 |
| `color` | ❌ | 渐变色类名 |

## 内置工具列表

| ID | 名称 | 组件名 | 说明 |
|------|------|--------|------|
| `json-formatter` | JSON 格式化 | JsonFormatter | 格式化、验证、压缩 JSON |
| `base64` | Base64 编解码 | Base64Tool | Base64 编码和解码 |
| `timestamp` | 时间戳转换 | TimestampTool | Unix 时间戳与日期互转 |
| `text-diff` | 文本对比 | TextDiffTool | 比较两段文本差异 |
| `url-encoder` | URL 编解码 | UrlEncoderTool | URL 编码和解码 |
| `color-converter` | 颜色转换器 | ColorConverterTool | HEX、RGB、HSL 互转 |

## 如何启用/禁用工具

### 禁用工具

将 `enabled` 设为 `false`：

```json
{
  "id": "qr-code",
  "enabled": false
}
```

### 启用工具

将 `enabled` 设为 `true`：

```json
{
  "id": "qr-code",
  "enabled": true
}
```

## 可用图标

工具图标使用 [Lucide Icons](https://lucide.dev/icons/)，常用图标：

| 图标名 | 说明 |
|--------|------|
| `Braces` | 大括号（JSON） |
| `Code` | 代码 |
| `Clock` | 时钟（时间） |
| `GitCompare` | 对比 |
| `Link` | 链接 |
| `Palette` | 调色板（颜色） |
| `QrCode` | 二维码 |
| `Key` | 钥匙（密码） |
| `Hash` | 哈希 |
| `Calculator` | 计算器 |
| `Ruler` | 尺子（单位转换） |
| `FileText` | 文本文件 |

## 渐变色配置

`color` 字段使用 Tailwind 渐变类：

```json
{
  "color": "from-blue-500 to-cyan-500"
}
```

**常用渐变色**：

| 渐变色 | 效果 |
|--------|------|
| `from-blue-500 to-cyan-500` | 蓝到青 |
| `from-green-500 to-emerald-500` | 绿到翠绿 |
| `from-purple-500 to-pink-500` | 紫到粉 |
| `from-orange-500 to-red-500` | 橙到红 |
| `from-indigo-500 to-blue-500` | 靛蓝到蓝 |
| `from-pink-500 to-rose-500` | 粉到玫瑰 |
| `from-teal-500 to-emerald-500` | 青绿到翠绿 |
| `from-amber-500 to-orange-500` | 琥珀到橙 |

## 配置示例

### 示例 1：只启用部分工具

```json
{
  "tools": [
    {
      "id": "json-formatter",
      "enabled": true
    },
    {
      "id": "base64",
      "enabled": true
    },
    {
      "id": "timestamp",
      "enabled": true
    },
    {
      "id": "text-diff",
      "enabled": false
    },
    {
      "id": "url-encoder",
      "enabled": false
    },
    {
      "id": "color-converter",
      "enabled": false
    }
  ]
}
```

### 示例 2：自定义工具顺序

```json
{
  "tools": [
    { "id": "timestamp", "enabled": true },
    { "id": "json-formatter", "enabled": true },
    { "id": "base64", "enabled": true }
  ]
}
```

工具会按照数组中的顺序显示。

## 添加新工具（高级）

如需添加全新的工具，需要：

1. 在 `src/components/tools/` 下创建新的工具组件
2. 在 `src/pages/ToolsPage.tsx` 中注册组件
3. 在 `tools.json` 中添加配置

**注意**：这需要修改代码，建议有一定 React 基础的用户操作。
