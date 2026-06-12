import type { MetadataRoute } from "next";

const siteUrl = "https://legal-compare-website.vercel.app";
const lastModified = new Date("2026-06-12");

const cardSlugs = [
  "offer",
  "acceptance",
  "consideration",
  "invitation-to-treat",
  "breach-of-contract",
];

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
    {
      url: `${siteUrl}/category/civil`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...cardSlugs.map((slug) => ({
      url: `${siteUrl}/cards/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
