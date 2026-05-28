# 抓取 formula1.com 加拿大大奖赛页面数据

## 修订方案

### 方案：使用 Node.js fetch 获取页面

1. 编写一个 Node.js 脚本，使用内置 `fetch` API 请求 `https://www.formula1.com/en/racing/2026/canada`
2. 分析返回的 HTML 内容
3. 如果是 SSR 页面，可直接从 HTML 提取数据
4. 如果是 CSR（客户端渲染），HTML 中可能包含 `__NEXT_DATA__` 或类似的 JSON 数据块

### 潜在风险
- formula1.com 使用 Cloudflare 防护，可能拦截非浏览器请求
- SPA 页面核心数据可能通过 JS 动态加载
- 返回内容可能不完整

### 备选：尝试 F1 内部 API
formula1.com 前端通常从 `api.formula1.com` 获取数据，可以尝试直接请求：
- `https://api.formula1.com/v1/event-tracker` 
- `https://api.formula1.com/v1/races?season=2026`

### 执行步骤
1. 用 node 执行 fetch 请求目标 URL
2. 检查返回状态码和内容类型
3. 如果成功，解析 HTML 提取有效数据
4. 如果被拦截，尝试 F1 内部 API 端点
