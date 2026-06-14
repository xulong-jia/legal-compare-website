import Link from "next/link";
import { getAllCards } from "@/lib/cards";
import {
  contractLawStages,
  contractLawTopic,
  getContractLawStageHref,
} from "@/lib/contractLawTopic";
import type { LegalCard } from "@/lib/types";

export const metadata = {
  title: "合同法专题 | 中外法律制度对照",
  description:
    "合同法专题总览，展示 12 张制度卡片的完成度、四阶段学习路径、阅读建议和后续扩展方向。",
  openGraph: {
    title: "合同法专题 | 中外法律制度对照",
    description:
      "合同法专题总览，展示 12 张制度卡片的完成度、四阶段学习路径、阅读建议和后续扩展方向。",
    type: "website",
  },
};

const readingTips = [
  "如果是初学者，建议从“要约邀请”开始顺序阅读。",
  "如果已经了解合同成立，可以直接从“合同解释”或“合同效力”进入。",
  "如果关注违约救济，可以从“违约责任”进入，再阅读“合同解除”和“损害赔偿”。",
  "如果已经完成前三个阶段，可以继续阅读“不可抗力”和“合同成立的特殊场景”，理解合同法中的例外情形和复杂交易场景。",
];

export default function ContractLawTopicPage() {
  const cards = getAllCards();

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <section className="max-w-3xl">
          <p className="text-sm font-medium text-zinc-500">专题总览</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {contractLawTopic.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-700">
            本专题用于比较中国法、大陆法系与普通法中合同法的基础制度，适合法律初学者和中外法律制度比较学习者。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={contractLawTopic.categoryPath}
              className="inline-flex items-center justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              开始学习合同法专题
            </Link>
            <Link
              href={getContractLawStageHref(contractLawStages[0].slugs[0])}
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              从第一阶段开始
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-md border border-zinc-200 bg-zinc-50 p-6">
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-zinc-950">当前完成度</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                当前已上线 {contractLawTopic.cardCount} 张卡片，覆盖合同成立、合同解释与效力、违约与救济、进阶专题与特殊情形四个阶段。
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white px-5 py-4 text-center">
              <span className="block text-2xl font-semibold text-zinc-950">
                {contractLawTopic.cardCount}
              </span>
              <span className="mt-1 block text-xs text-zinc-500">张卡片</span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-zinc-950">四阶段学习路径</h2>
          <div className="mt-5 grid gap-5">
            {contractLawStages.map((stage, stageIndex) => {
              const stageCards = stage.slugs
                .map((slug) => cards.find((card) => card.slug === slug))
                .filter((card): card is LegalCard => Boolean(card));

              return (
                <article
                  key={stage.id}
                  className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-500">
                        阶段 {stageIndex + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-zinc-950">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {stage.readingGoal}
                      </p>
                    </div>
                    <Link
                      href={getContractLawStageHref(stage.slugs[0])}
                      className="inline-flex shrink-0 items-center justify-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-50"
                    >
                      查看本阶段
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {stageCards.map((card) => (
                      <div
                        key={card.slug}
                        className="rounded-md bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
                      >
                        {card.title}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">建议阅读方式</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700">
              {readingTips.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-950">后续扩展方向</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-700">
              后续可继续扩展合同履行、合同变更、第三人利益合同等主题。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
