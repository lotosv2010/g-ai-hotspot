# AI 热点资讯

一个基于 Next.js + TypeScript + Ant Design 的 AI 行业新闻聚合系统，自动抓取国内外 AI 相关资讯。

## ✨ 功能特性

- 🌍 **多源聚合** - 支持 17+ 个国内外 AI 新闻源
- 📅 **日期归档** - 按年/月/日期树形归档展示
- 🏷️ **智能分类** - 自动分类：行业发展、产品发布、初创融资
- 🎯 **标签提取** - 自动提取公司名称和技术标签
- 🔄 **定时任务** - 支持定时自动爬取（每 6 小时）
- 🎨 **精美 UI** - 基于 Ant Design，OpenAI 主题风格
- 📱 **响应式** - 适配桌面端和移动端

## 🏗️ 技术栈

### 前端框架
- **Next.js 14** - React 框架，App Router
- **TypeScript** - 类型安全
- **React 18** - UI 库

### UI 组件
- **Ant Design 6** - 企业级 UI 组件库
- **Lucide Icons** - 图标库
- **Tailwind CSS** - 原子化 CSS（可选）

### 数据处理
- **Axios** - HTTP 请求
- **Cheerio** - HTML 解析（类 jQuery）
- **node-cron** - 定时任务调度

### 后端
- **Next.js API Routes** - RESTful API
- **File System** - JSON 文件存储

## 📁 项目结构

```
g-ai-hotspot/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   ├── crawl/        # 爬取接口
│   │   │   ├── news/         # 新闻接口
│   │   │   └── schedule/     # 定时任务接口
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   └── globals.css        # 全局样式
│   ├── components/            # React 组件
│   │   ├── layout/           # 布局组件
│   │   │   ├── AppHeader.tsx # 顶部导航
│   │   │   └── DateSidebar.tsx # 日期侧边栏
│   │   ├── news/             # 新闻组件
│   │   │   ├── ArticleCard.tsx # 新闻卡片
│   │   │   ├── ArticleList.tsx # 新闻列表
│   │   │   ├── LoadingState.tsx # 加载状态
│   │   │   └── EmptyState.tsx   # 空状态
│   │   └── ui/               # UI 组件
│   ├── config/                # 配置文件
│   │   └── sources.ts        # 新闻源配置
│   ├── hooks/                 # React Hooks
│   │   ├── useNews.ts        # 新闻数据 Hook
│   │   ├── useCrawl.ts       # 爬取 Hook
│   │   └── useDateTree.ts    # 日期树 Hook
│   ├── lib/                   # 核心库
│   │   ├── crawler-service.ts # 爬虫服务
│   │   ├── storage.ts         # 数据存储
│   │   └── crawlers/          # 爬虫模块
│   │       ├── base.ts       # 基础爬虫
│   │       ├── generic.ts    # 通用爬虫
│   │       └── factory.ts    # 爬虫工厂
│   ├── types/                 # 类型定义
│   │   ├── news.ts           # 新闻类型
│   │   └── ui.ts             # UI 类型
│   └── utils/                 # 工具函数
│       └── formatters.ts     # 格式化函数
├── data/                      # 数据存储
│   ├── articles/             # 新闻数据
│   └── logs/                 # 爬取日志
└── package.json
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 运行开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 📡 API 接口

### 获取新闻列表

```http
GET /api/news?region=all&keyword=&limit=100
```

**参数：**
- `region`: 筛选地区（all | domestic | international）
- `keyword`: 搜索关键词（可选）
- `limit`: 返回数量（默认 100）

**响应：**
```json
{
  "success": true,
  "data": [
    {
      "id": "article_id",
      "title": "文章标题",
      "url": "https://example.com/article",
      "source": "新闻源名称",
      "category": "product",
      "tags": ["OpenAI", "GPT"],
      "region": "international",
      "publishedAt": "2026-02-26T10:00:00Z",
      "crawledAt": "2026-02-26T10:00:00Z"
    }
  ]
}
```

### 触发爬取任务

```http
POST /api/crawl
```

**响应：**
```json
{
  "success": true,
  "data": {
    "results": [...],
    "articlesCount": 10
  }
}
```

### 启动定时任务

```http
POST /api/schedule
```

启动定时任务，每 6 小时自动爬取一次。

### 停止定时任务

```http
DELETE /api/schedule
```

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件：

```env
# 代理 URL（可选，用于访问被墙网站）
PROXY_URL=https://your-proxy.com/

# 数据存储路径（默认 ./data）
DATA_PATH=./data
```

### 新闻源配置

编辑 `src/config/sources.ts` 添加或修改新闻源：

```typescript
{
  id: 'your-source',
  name: '你的新闻源',
  region: 'domestic', // 或 'international'
  url: 'https://example.com/news'
}
```

## 🏢 支持的新闻源

### 国内新闻源
- 36氪 AI
- 虎嗅 AI
- 界面新闻 AI
- TechCrunch 中文
- 千问资讯（阿里通义）
- DeepSeek
- 腾讯 AI
- 字节跳动 AI（豆包）
- Kimi 智能助手
- 雷锋网 AI

### 国际新闻源
- OpenAI Blog
- Google AI
- xAI (Grok)
- Anthropic (Claude)
- TechCrunch AI
- The Verge AI
- VentureBeat AI
- MIT AI News
- Wired AI
- arXiv AI
- AI News

## 🎨 组件说明

### 核心组件

| 组件 | 路径 | 说明 |
|------|------|------|
| `AppHeader` | `components/layout/AppHeader.tsx` | 顶部导航栏 |
| `DateSidebar` | `components/layout/DateSidebar.tsx` | 日期归档侧边栏 |
| `ArticleCard` | `components/news/ArticleCard.tsx` | 新闻卡片 |
| `ArticleList` | `components/news/ArticleList.tsx` | 新闻列表 |
| `LoadingState` | `components/news/LoadingState.tsx` | 加载状态 |
| `EmptyState` | `components/news/EmptyState.tsx` | 空状态 |

### 自定义 Hooks

| Hook | 路径 | 说明 |
|------|------|------|
| `useNews` | `hooks/useNews.ts` | 新闻数据获取 |
| `useCrawl` | `hooks/useCrawl.ts` | 爬取任务管理 |
| `useDateTree` | `hooks/useDateTree.ts` | 日期树构建 |

## 🐛 爬虫架构

### 基础爬虫类 (BaseCrawler)

提供通用的爬取功能：
- HTML 获取
- 日期规范化
- ID 生成

### 通用爬虫类 (GenericCrawler)

使用选择器策略提取文章：
- 自动识别文章元素
- 智能分类（行业发展/产品发布/初创融资）
- 标签提取（公司/技术关键词）

### 扩展爬虫

创建自定义爬虫继承 `BaseCrawler`：

```typescript
import { BaseCrawler } from '@/lib/crawlers/base';

class CustomCrawler extends BaseCrawler {
  protected parseHTML(html: string): NewsArticle[] {
    // 自定义解析逻辑
    return articles;
  }
}
```

## 🔍 分类逻辑

### 文章分类

根据标题关键词自动分类：

- **行业发展**：合作、收购、突破、创新
- **产品发布**：产品、发布、上线、版本、更新
- **初创融资**：融资、投资、估值、IPO

### 标签提取

- 自动识别热门公司名称（OpenAI、Google、DeepSeek 等）
- 提取技术关键词（GPT、LLM、多模态、RAG 等）

## 📝 开发指南

### 添加新新闻源

1. 在 `src/config/sources.ts` 添加配置
2. 如需自定义解析，创建新的爬虫类
3. 在 `src/lib/crawlers/factory.ts` 注册

### 添加新分类

1. 在 `src/lib/crawlers/generic.ts` 添加分类关键词
2. 在 `src/utils/formatters.ts` 添加分类名称和颜色

### 样式定制

项目使用 Ant Design 主题，可在 `src/app/globals.css` 中自定义样式。

## 🚨 注意事项

### 爬取频率

- 默认定时任务每 6 小时执行一次
- 手动触发爬取无限制
- 请遵守目标网站的 robots.txt

### 代理设置

如果需要访问被墙网站，配置 `PROXY_URL` 环境变量。

### 数据存储

- 数据存储在 `data` 目录
- 建议定期备份
- 可扩展为数据库存储

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题，请提交 Issue。
