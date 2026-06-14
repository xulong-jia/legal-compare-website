import Link from "next/link";
import { contractLawStages, contractLawTopic } from "@/lib/contractLawTopic";

export const metadata = {
  title: "中外法律制度对照 | 比较法学习知识库",
  description:
    "面向法学学习、比较法研究与涉外法律入门的结构化知识库，通过制度卡片对比中国法、大陆法系与普通法系规则。",
  openGraph: {
    title: "中外法律制度对照 | 比较法学习知识库",
    description:
      "面向法学学习、比较法研究与涉外法律入门的结构化知识库，通过制度卡片对比中国法、大陆法系与普通法系规则。",
    type: "website",
  },
};

const mvpItems = [
  "首页",
  "分类页",
  "卡片详情页",
  "关于页",
  `${contractLawTopic.cardCount} 张合同法制度卡片`,
];
const excludedItems = ["登录", "收藏", "评论", "付费", "AI 问答", "复杂搜索"];
const stageSummary = contractLawStages.map((stage) => stage.title).join(" / ");

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
            本项目通过“制度卡片”对比中国法、大陆法系与普通法系中的重要法律规则。
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            当前已上线合同法专题学习路径，包含 {contractLawTopic.cardCount} 张中外法律制度比较卡片。
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            学习路径按“{stageSummary}”四阶段组织。
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
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-medium text-zinc-500">专题入口</p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                  合同法专题学习路径
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  已上线 {contractLawTopic.cardCount} 张卡片，按“{stageSummary}”四个阶段组织，适合从合同成立逐步进入救济和特殊情形。
                </p>
                <div className="mt-5 grid gap-3 text-sm text-zinc-700 sm:grid-cols-3">
                  <div className="rounded-md bg-zinc-50 p-3">
                    <span className="block text-xs text-zinc-500">内容规模</span>
                    <span className="mt-1 block font-medium text-zinc-950">
                      {contractLawTopic.cardCount} 张卡片
                    </span>
                  </div>
                  <div className="rounded-md bg-zinc-50 p-3">
                    <span className="block text-xs text-zinc-500">学习结构</span>
                    <span className="mt-1 block font-medium text-zinc-950">
                      四阶段路径
                    </span>
                  </div>
                  <div className="rounded-md bg-zinc-50 p-3">
                    <span className="block text-xs text-zinc-500">适用场景</span>
                    <span className="mt-1 block font-medium text-zinc-950">
                      比较法入门
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={contractLawTopic.categoryPath}
                  className="inline-flex items-center justify-center rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  进入合同法专题
                </Link>
                <Link
                  href={contractLawTopic.overviewPath}
                  className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                >
                  查看专题总览
                </Link>
              </div>
            </div>
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
