import Link from "next/link";

export const metadata = {
  title: "中外法律制度对照 | 比较法学习知识库",
  description:
    "面向法学学习、比较法研究与涉外法律入门的结构化知识库，通过制度卡片对比中国法、大陆法系与英美法系规则。",
  openGraph: {
    title: "中外法律制度对照 | 比较法学习知识库",
    description:
      "面向法学学习、比较法研究与涉外法律入门的结构化知识库，通过制度卡片对比中国法、大陆法系与英美法系规则。",
    type: "website",
  },
};

const mvpItems = ["首页", "分类页", "卡片详情页", "关于页", "5 张合同法制度卡片"];
const excludedItems = ["登录", "收藏", "评论", "付费", "AI 问答", "复杂搜索"];

export default function Home() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            中外法律制度对照
          </h1>
          <p className="mt-5 text-xl leading-8 text-zinc-700">
            面向法学学习、比较法研究与涉外法律入门的结构化知识库
          </p>
          <p className="mt-6 text-base leading-7 text-zinc-600">
            本项目通过“制度卡片”对比中国法、大陆法系与英美法系中的重要法律规则。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/category/civil"
              className="inline-flex items-center justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              查看民法分类
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              了解项目
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">当前 MVP 范围</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {mvpItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-950">暂不包含</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {excludedItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <p className="rounded-md border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
          本站内容仅供学习与研究参考，不构成法律意见。
        </p>
      </section>
    </div>
  );
}
