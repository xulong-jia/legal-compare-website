import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardsByCategory } from "@/lib/cards";
import { categories, getCategoryById } from "@/lib/categories";
import { contractLawStages, contractLawTopic } from "@/lib/contractLawTopic";
import type { CategoryId, LegalCard } from "@/lib/types";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

function getCardNumber(cards: LegalCard[], card: LegalCard) {
  const index = cards.findIndex((item) => item.slug === card.slug);
  return String(index + 1).padStart(2, "0");
}

function CardListItem({
  card,
  number,
}: {
  card: LegalCard;
  number: string;
}) {
  return (
    <article className="rounded-md border border-zinc-200 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="shrink-0 text-sm font-semibold text-zinc-400">
            {number}
          </span>
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              {card.summary}
            </p>
          </div>
        </div>
        <Link
          href={`/cards/${card.slug}`}
          className="shrink-0 text-sm font-medium text-zinc-950 hover:text-zinc-700"
        >
          进入详情页
        </Link>
      </div>

      <dl className="mt-5 grid gap-3 text-sm text-zinc-600 sm:grid-cols-3">
        <div>
          <dt className="font-medium text-zinc-900">子分类</dt>
          <dd className="mt-1">{card.subcategory ?? "未分类"}</dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-900">难度</dt>
          <dd className="mt-1">{card.difficulty}</dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-900">更新时间</dt>
          <dd className="mt-1">{card.updatedAt}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryId = category as CategoryId;
  const categoryConfig = getCategoryById(categoryId);

  if (!categoryConfig) {
    return {
      title: "分类未找到 | 中外法律制度对照",
      description: "该分类不存在或尚未收录。",
    };
  }

  const title = `${categoryConfig.name} | 中外法律制度对照`;

  return {
    title,
    description: categoryConfig.description,
    openGraph: {
      title,
      description: categoryConfig.description,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryId = category as CategoryId;
  const categoryConfig = getCategoryById(categoryId);

  if (!categoryConfig) {
    notFound();
  }

  const cards = getCardsByCategory(categoryId);
  const isCivilCategory = categoryId === contractLawTopic.categoryId;

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <section className="max-w-3xl">
          <p className="text-sm font-medium text-zinc-500">制度分类</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            {categoryConfig.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-700">
            {categoryConfig.description}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            当前分类下共有 {cards.length} 张制度卡片。
          </p>
          {!isCivilCategory && (
            <p className="mt-2 text-sm text-zinc-500">
              建议按卡片顺序阅读，先理解基础概念，再进入制度比较。
            </p>
          )}
        </section>

        <section className="mt-10">
          {cards.length === 0 ? (
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
              当前分类暂未收录制度卡片。
            </div>
          ) : isCivilCategory ? (
            <div className="space-y-8">
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-6">
                <h2 className="text-xl font-semibold text-zinc-950">
                  合同法专题学习路径
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  本专题目前包含 {contractLawTopic.cardCount} 张卡片，按照“合同成立 → 合同解释与效力 →
                  违约与救济”的顺序组织，适合从基础概念逐步进入制度比较。
                </p>
                <div className="mt-5">
                  <p className="text-sm font-medium text-zinc-900">快速跳转：</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {contractLawStages.map((stage) => (
                      <Link
                        key={stage.id}
                        href={`#${stage.id}`}
                        className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:text-zinc-950"
                      >
                        {stage.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {contractLawStages.map((stage) => {
                const stageCards = stage.slugs
                  .map((slug) => cards.find((card) => card.slug === slug))
                  .filter((card): card is LegalCard => Boolean(card));

                return (
                  <section key={stage.id} id={stage.id}>
                    <div className="border-b border-zinc-200 pb-4">
                      <h2 className="text-lg font-semibold text-zinc-950">
                        {stage.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {stage.description}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">
                        建议阅读目标：{stage.readingGoal}
                      </p>
                    </div>
                    <div className="mt-4 grid gap-4">
                      {stageCards.map((card) => (
                        <CardListItem
                          key={card.slug}
                          card={card}
                          number={getCardNumber(cards, card)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4">
              {cards.map((card, index) => (
                <CardListItem
                  key={card.slug}
                  card={card}
                  number={String(index + 1).padStart(2, "0")}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
