import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardsByCategory } from "@/lib/cards";
import { getCategoryById } from "@/lib/categories";
import type { CategoryId } from "@/lib/types";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

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
        </section>

        <section className="mt-10">
          {cards.length === 0 ? (
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
              当前分类暂未收录制度卡片。
            </div>
          ) : (
            <div className="grid gap-4">
              {cards.map((card) => (
                <article
                  key={card.slug}
                  className="rounded-md border border-zinc-200 p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-950">
                        {card.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-zinc-700">
                        {card.summary}
                      </p>
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
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
