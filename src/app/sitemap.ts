import type { MetadataRoute } from "next";
import { getAllCards } from "@/lib/cards";
import { categories } from "@/lib/categories";

const siteUrl = "https://legal-compare-website.vercel.app";
const lastModified = new Date("2026-06-12");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...categories.map((category) => ({
      url: `${siteUrl}/category/${category.id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllCards().map((card) => ({
      url: `${siteUrl}/cards/${card.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
