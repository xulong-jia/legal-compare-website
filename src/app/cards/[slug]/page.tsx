import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCards, getCardBySlug, getCardsByCategory } from "@/lib/cards";
import { getCategoryById } from "@/lib/categories";
import {
  getContractLawStageBySlug,
  getContractLawStageHref,
} from "@/lib/contractLawTopic";
import type { LegalCard } from "@/lib/types";

type CardPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllCards().map((card) => ({
    slug: card.slug,
  }));
}

export async function generateMetadata({
  params,
}: CardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    return {
      title: "制度卡片未找到 | 中外法律制度对照",
      description: "该制度卡片不存在或尚未收录。",
    };
  }

  const title = `${card.title} | 中外法律制度对照`;

  return {
    title,
    description: card.summary,
    openGraph: {
      title,
      description: card.summary,
      type: "article",
    },
  };
}

function renderContent(content: string) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("## ")) {
        const heading = line.replace(/^##\s+/, "");

        return (
          <h2 key={line} className="mt-12 text-2xl font-semibold text-zinc-950">
            {heading}
          </h2>
        );
      }

      return (
        <p key={line} className="mt-5 text-base leading-8 text-zinc-700">
          {line}
        </p>
      );
    });
}

function getLearningPath(card: LegalCard) {
  const categoryCards = getCardsByCategory(card.category);
  const currentIndex = categoryCards.findIndex((item) => item.slug === card.slug);

  return {
    categoryCards,
    currentIndex,
    previousCard: currentIndex > 0 ? categoryCards[currentIndex - 1] : undefined,
    nextCard:
      currentIndex >= 0 && currentIndex < categoryCards.length - 1
        ? categoryCards[currentIndex + 1]
        : undefined,
  };
}

function getCardNumber(cards: LegalCard[], card: LegalCard) {
  const index = cards.findIndex((item) => item.slug === card.slug);
  return String(index + 1).padStart(2, "0");
}

function getLearningStage(card: LegalCard, categoryCards: LegalCard[]) {
  const stage = getContractLawStageBySlug(card.slug);

  if (!stage) {
    return undefined;
  }

  return {
    title: stage.title,
    id: stage.id,
    cards: stage.slugs
      .map((slug) => categoryCards.find((item) => item.slug === slug))
      .filter((item): item is LegalCard => Boolean(item)),
  };
}

export default async function CardPage({ params }: CardPageProps) {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    notFound();
  }

  const category = getCategoryById(card.category);
  const categoryName = category?.name ?? card.category;
  const learningPath = card.subcategory
    ? `${categoryName} / ${card.subcategory}`
    : categoryName;
  const { categoryCards, currentIndex, previousCard, nextCard } =
    getLearningPath(card);
  const learningProgress =
    currentIndex >= 0 ? `第 ${currentIndex + 1} / ${categoryCards.length} 张` : undefined;
  const learningStage = getLearningStage(card, categoryCards);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <Link
          href={`/category/${card.category}`}
          className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
        >
          返回分类页
        </Link>

        <header className="mt-8 border-b border-zinc-200 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {card.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-700">
            {card.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="rounded-md bg-zinc-100 px-3 py-1.5 text-zinc-700">
              所属学习路径：{learningPath}
            </span>
            {learningStage && (
              <span className="rounded-md bg-zinc-100 px-3 py-1.5 text-zinc-700">
                所属阶段：{learningStage.title}
              </span>
            )}
          </div>

          <dl className="mt-6 grid gap-4 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 sm:grid-cols-5">
            {learningProgress && (
              <div className="min-w-0">
                <dt className="font-medium text-zinc-900">学习进度</dt>
                <dd className="mt-1">{learningProgress}</dd>
              </div>
            )}
            <div className="min-w-0">
              <dt className="font-medium text-zinc-900">分类 ID</dt>
              <dd className="mt-1">{card.category}</dd>
            </div>
            <div className="min-w-0">
              <dt className="font-medium text-zinc-900">子分类</dt>
              <dd className="mt-1">{card.subcategory ?? "未分类"}</dd>
            </div>
            <div className="min-w-0">
              <dt className="font-medium text-zinc-900">难度</dt>
              <dd className="mt-1">{card.difficulty}</dd>
            </div>
            <div className="min-w-0">
              <dt className="font-medium text-zinc-900">更新时间</dt>
              <dd className="mt-1">{card.updatedAt}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article className="mt-8">
          <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
            提示：本卡片用于学习与研究中的制度比较，不构成针对具体案件或交易的法律意见。
          </div>
          {learningStage && (
            <section className="mt-6 rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-zinc-950">
                    同阶段学习
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    查看“{learningStage.title}”阶段中的相邻主题。
                  </p>
                </div>
                <Link
                  href={getContractLawStageHref(card.slug)}
                  className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-50"
                >
                  返回本阶段列表
                </Link>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                {learningStage.cards.map((stageCard) => {
                  const label = `${getCardNumber(categoryCards, stageCard)} ${stageCard.title}`;
                  const isCurrentCard = stageCard.slug === card.slug;

                  return isCurrentCard ? (
                    <p
                      key={stageCard.slug}
                      className="rounded-md bg-zinc-100 px-3 py-2 font-medium text-zinc-950"
                    >
                      {label}（当前）
                    </p>
                  ) : (
                    <Link
                      key={stageCard.slug}
                      href={`/cards/${stageCard.slug}`}
                      className="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
          {renderContent(card.content)}
        </article>

        {(previousCard || nextCard) && (
          <section className="mt-12 rounded-md border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-zinc-950">继续学习</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              按合同法专题整体顺序继续阅读。
            </p>
            <nav className="mt-4 grid gap-4 sm:grid-cols-2">
              {previousCard ? (
                <Link
                  href={`/cards/${previousCard.slug}`}
                  className="rounded-md border border-zinc-200 bg-white p-4 text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  <span className="block text-xs text-zinc-500">上一篇</span>
                  <span className="mt-1 block font-medium text-zinc-950">
                    {previousCard.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextCard && (
                <Link
                  href={`/cards/${nextCard.slug}`}
                  className="rounded-md border border-zinc-200 bg-white p-4 text-sm text-zinc-700 hover:bg-zinc-50 sm:text-right"
                >
                  <span className="block text-xs text-zinc-500">下一篇</span>
                  <span className="mt-1 block font-medium text-zinc-950">
                    {nextCard.title}
                  </span>
                </Link>
              )}
            </nav>
          </section>
        )}
      </main>
    </div>
  );
}
