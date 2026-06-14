# 中外法律制度对照网站 MVP

这是一个面向法学学习、比较法研究与涉外法律入门的结构化知识库 MVP。

当前内容以 `content/cards/*.mdx` 中的制度卡片为核心，页面包括首页、关于页、分类页和卡片详情页。

当前合同法学习路径已包含 12 张卡片。

合同法专题现在按“合同成立基础 / 合同内容、解释与效力 / 违约与救济 / 进阶专题与特殊情形”四个阶段组织。

卡片详情页会显示所属学习路径、所属阶段、同阶段学习和继续学习导航。

首页提供合同法专题入口，分类页支持四阶段锚点跳转，详情页支持返回本阶段列表。

合同法专题总览页：`/topics/contract-law`，用于展示专题完成度、四阶段学习路径和阅读建议。

合同法专题配置集中维护在 `src/lib/contractLawTopic.ts`，底层数据在 `src/lib/contractLawTopicData.js`，供页面和校验脚本复用。

新增或调整合同法阶段时，应同步更新共享配置并运行：

```bash
npm run validate:cards
```

合同法卡片扩展规划见 `docs/contract-law-card-roadmap.md`。

合同法专题内容审校报告见 `docs/contract-law-content-review.md`。

标签、难度与阶段筛选功能设计见 `docs/filtering-design.md`。

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
