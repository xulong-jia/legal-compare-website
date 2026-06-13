# 中外法律制度对照网站 MVP

这是一个面向法学学习、比较法研究与涉外法律入门的结构化知识库 MVP。

当前内容以 `content/cards/*.mdx` 中的制度卡片为核心，页面包括首页、关于页、分类页和卡片详情页。

合同法卡片扩展规划见 `docs/contract-law-card-roadmap.md`。

## 本地开发

启动开发服务器：

```bash
npm run dev
```

访问：

```text
http://localhost:3000
```

## 检查命令

新增或修改 `content/cards/*.mdx` 后，先运行卡片内容校验：

```bash
npm run validate:cards
```

运行 lint 检查：

```bash
npm run lint
```

运行综合检查：

```bash
npm run check
```

`npm run check` 会依次执行卡片校验、lint 和 build。

## GitHub Actions 与部署

push 到 GitHub 后，GitHub Actions 会自动运行：

```bash
npm run validate:cards
npm run lint
```

当前 CI 暂不运行 `npm run build`。生产部署由 Vercel 自动完成，build 由 Vercel 处理。
