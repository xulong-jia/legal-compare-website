import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardBySlug } from "@/lib/cards";

type CardPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
          <h2 key={line} className="mt-10 text-2xl font-semibold text-zinc-950">
            {heading}
          </h2>
        );
      }

      return (
        <p key={line} className="mt-4 text-base leading-7 text-zinc-700">
          {line}
        </p>
      );
    });
}

export default async function CardPage({ params }: CardPageProps) {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    notFound();
  }

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

          <dl className="mt-6 grid gap-4 text-sm text-zinc-600 sm:grid-cols-4">
            <div>
              <dt className="font-medium text-zinc-900">分类 ID</dt>
              <dd className="mt-1">{card.category}</dd>
            </div>
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

        <article className="mt-8">{renderContent(card.content)}</article>
      </main>
    </div>
  );
}
