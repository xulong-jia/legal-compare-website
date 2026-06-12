export type CategoryId =
  | "civil"
  | "criminal"
  | "procedure-evidence"
  | "constitutional-administrative"
  | "business"
  | "international";

export type LegalSystem = "china" | "civil-law" | "common-law";

export type CardFrontmatter = {
  title: string;
  slug: string;
  category: CategoryId;
  subcategory?: string;
  summary: string;
  tags: string[];
  systems: LegalSystem[];
  difficulty: "入门" | "进阶" | "专题";
  updatedAt: string;
};

export type LegalCard = CardFrontmatter & {
  content: string;
};
