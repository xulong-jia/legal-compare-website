const contentSections = [
  "中国法规则",
  "大陆法系背景",
  "英美法系规则",
  "核心差异",
  "法条 / 判例 / 来源",
  "考试提示",
  "论文角度",
  "实务提示",
  "延伸阅读",
];

const mvpScope = ["首页", "分类页", "卡片详情页", "关于页", "5 张合同法制度卡片"];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <section className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            关于本项目
          </h1>
          <div className="mt-6 space-y-4 text-base leading-7 text-zinc-700">
            <p>
              本项目是一个“中外法律制度对照网站”，面向法学学习、比较法研究、涉外法律入门和论文选题。
            </p>
            <p>
              项目的核心内容单位是“制度卡片”，用于把同一法律制度在不同法域和法系中的规则、来源与差异整理成可阅读、可复习的结构化内容。
            </p>
          </div>
        </section>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-md border border-zinc-200 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">内容结构</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              每张制度卡片未来会包含以下内容：
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {contentSections.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-zinc-200 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">MVP 阶段范围</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              当前阶段只做最小可运行版本，先验证网站结构和制度卡片模板。
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {mvpScope.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-md border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-950">免责声明</h2>
          <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-700">
            <p>本站内容仅供学习与研究参考，不构成法律意见。</p>
            <p>
              如涉及具体案件或法律事务，应咨询具备相应资质的法律专业人士。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
