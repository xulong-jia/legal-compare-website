import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CategoryId, CardFrontmatter, LegalCard } from "./types";

const cardsDirectory = path.join(process.cwd(), "content", "cards");

function sortCards(cards: LegalCard[]): LegalCard[] {
  return [...cards].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.title.localeCompare(b.title, "zh-CN");
  });
}

export function getAllCards(): LegalCard[] {
  const fileNames = fs
    .readdirSync(cardsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));

  const cards = fileNames.map((fileName) => {
    const filePath = path.join(cardsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const frontmatter = data as CardFrontmatter;

    return {
      ...frontmatter,
      content,
    };
  });

  return sortCards(cards);
}

export function getCardBySlug(slug: string): LegalCard | undefined {
  return getAllCards().find((card) => card.slug === slug);
}

export function getCardsByCategory(category: CategoryId): LegalCard[] {
  return getAllCards().filter((card) => card.category === category);
}
