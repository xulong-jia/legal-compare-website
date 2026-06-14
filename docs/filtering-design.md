# 标签、难度与阶段筛选设计

## 背景

合同法专题已经包含 12 张制度卡片，并通过 `contractLawStages` 组织为四个阶段。随着卡片数量增加，读者需要更快地按学习阶段、难度、标签或法系定位内容。

本设计文档只定义后续筛选功能的规格，不实现筛选 UI，不引入数据库或新依赖。

## 当前数据基础

当前可直接使用的数据包括：

- `content/cards/*.mdx` frontmatter
- `src/lib/cards.ts` 读取后的 `LegalCard[]`
- `src/lib/contractLawTopicData.js` 中的四阶段配置
- `CardFrontmatter.tags`
- `CardFrontmatter.difficulty`
- `CardFrontmatter.systems`
- `CardFrontmatter.category`
- `CardFrontmatter.subcategory`

第一版筛选可以完全基于静态数据完成，不需要数据库。

## 筛选维度

建议第一版支持四类筛选：

1. 阶段：来自 `contractLawStages`
   - `contract-formation-basics`
   - `contract-content-validity`
   - `breach-and-remedies`
   - `advanced-special-issues`
2. 难度：来自 `difficulty`
   - 入门
   - 进阶
   - 专题
3. 标签：从 `cards.frontmatter.tags` 聚合
   - 例如：合同成立、违约救济、损害赔偿、不可抗力、格式条款
4. 法系：来自 `systems`
   - `china`
   - `civil-law`
   - `common-law`

## 第一版筛选范围

第一版建议只在以下页面之一实现：

- `/category/civil`
- 或未来的 `/topics/contract-law`

优先建议在 `/category/civil` 实现，因为该页已经展示卡片列表、编号和阶段结构，筛选结果可以直接作用于现有卡片集合。

## 用户交互设计

建议使用轻量筛选控件：

- 阶段：按钮组或下拉菜单
- 难度：分段按钮或下拉菜单
- 标签：下拉菜单或可换行标签按钮
- 法系：复选框或按钮组

第一版建议一次只支持每个维度选一个值，降低 URL 状态和空结果处理复杂度。

筛选区域应包含：

- 当前筛选条件显示
- 清除筛选按钮
- 空状态：当前条件下暂无卡片

## URL 参数设计

建议使用查询参数保存筛选状态：

- `stage`
- `difficulty`
- `tag`
- `system`

示例：

```text
/category/civil?stage=breach-and-remedies
/category/civil?difficulty=专题
/category/civil?tag=违约救济
/category/civil?system=common-law
```

如果后续支持组合筛选，可以使用：

```text
/category/civil?stage=breach-and-remedies&difficulty=进阶
```

第一版不建议支持同一维度多选，避免 URL 编码和 UI 状态过早复杂化。

## 数据来源设计

阶段筛选：

- 从 `contractLawStages` 读取阶段 id、标题和 slugs。
- 当 `stage` 参数存在时，只显示该阶段 slugs 对应的卡片。

难度筛选：

- 从 `card.difficulty` 过滤。

标签筛选：

- 从所有当前分类卡片的 `tags` 聚合可选项。
- 第一版不建议手写标签配置，避免与内容 frontmatter 脱节。

法系筛选：

- 从 `card.systems` 判断是否包含 `china`、`civil-law` 或 `common-law`。
- UI 展示名建议映射为：中国法、大陆法系、普通法系。

## 组件拆分建议

后续实现时可以拆成以下轻量组件：

1. `CategoryFilterBar`
   - 接收可选阶段、难度、标签、法系列表和当前参数。
   - 负责渲染筛选入口和清除筛选。

2. `FilteredCardList`
   - 接收过滤后的卡片。
   - 复用现有卡片列表展示结构。

3. `FilterSummary`
   - 显示当前筛选条件和结果数量。

4. `EmptyFilterState`
   - 显示“当前筛选条件下暂无制度卡片”。

第一版也可以先不拆新组件，在 `/category/[category]/page.tsx` 内部局部实现；等交互稳定后再抽组件。

## 不做的范围

第一版明确不做：

- 全文搜索
- 多关键词搜索
- 模糊匹配
- 高亮搜索结果
- 数据库
- 用户保存筛选
- 登录态个性化
- 跨分类全站筛选
- 搜索结果排序权重

## 后续实现步骤

建议分两步推进：

1. MVP 1.9：静态筛选设计落地
   - 读取 `searchParams`
   - 根据阶段、难度、标签、法系过滤当前分类卡片
   - 渲染轻量筛选入口、结果数量和空状态

2. MVP 2.0：搜索功能
   - 再评估是否需要全文搜索、关键词匹配和结果高亮
   - 优先保持静态生成和低复杂度

实现前应先统一 tags 颗粒度，避免标签筛选结果过宽或重复。
