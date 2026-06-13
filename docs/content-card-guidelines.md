# 制度卡片内容维护说明

卡片内容统一放在 `content/cards/*.mdx`。

文件名必须和 frontmatter 里的 `slug` 一致。例如：

```text
content/cards/offer.mdx
slug: "offer"
```

每张卡片的 frontmatter 必须包含：

```text
title
slug
category
summary
tags
systems
difficulty
updatedAt
```

`category` 可选值：

```text
civil
criminal
procedure-evidence
constitutional-administrative
business
international
```

`systems` 可选值：

```text
china
civil-law
common-law
```

`difficulty` 可选值：

```text
入门
进阶
专题
```

`order` 用于学习路径排序。建议使用 `10`、`20`、`30` 这样的间隔数字，方便以后在中间插入新卡片。

新增或修改卡片后，运行：

```bash
npm run validate:cards
```
