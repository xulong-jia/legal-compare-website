import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const cardsDirectory = path.join(process.cwd(), "content", "cards");

const validCategories = new Set([
  "civil",
  "criminal",
  "procedure-evidence",
  "constitutional-administrative",
  "business",
  "international",
]);

const validSystems = new Set(["china", "civil-law", "common-law"]);
const validDifficulties = new Set(["入门", "进阶", "专题"]);
const requiredFields = [
  "title",
  "slug",
  "category",
  "summary",
  "tags",
  "systems",
  "difficulty",
  "updatedAt",
];

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateStringArray(value, validValues) {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }

  return value.every((item) => {
    if (!isNonEmptyString(item)) {
      return false;
    }

    return validValues ? validValues.has(item) : true;
  });
}

function addIssue(issues, fileName, message) {
  issues.push(`${fileName}: ${message}`);
}

function validateCard(fileName, data, seenSlugs, seenOrders, issues) {
  for (const field of requiredFields) {
    if (data[field] === undefined) {
      addIssue(issues, fileName, `missing required field "${field}"`);
    }
  }

  if (!isNonEmptyString(data.title)) {
    addIssue(issues, fileName, "title must be a non-empty string");
  }

  if (!isNonEmptyString(data.slug)) {
    addIssue(issues, fileName, "slug must be a non-empty string");
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    addIssue(
      issues,
      fileName,
      "slug must use lowercase letters, numbers, and hyphens only",
    );
  }

  const expectedSlug = path.basename(fileName, ".mdx");
  if (data.slug !== expectedSlug) {
    addIssue(
      issues,
      fileName,
      `slug must match file name "${expectedSlug}"`,
    );
  }

  if (isNonEmptyString(data.slug)) {
    const previousFileName = seenSlugs.get(data.slug);

    if (previousFileName) {
      addIssue(
        issues,
        fileName,
        `duplicate slug "${data.slug}" also used by ${previousFileName}`,
      );
    } else {
      seenSlugs.set(data.slug, fileName);
    }
  }

  if (!validCategories.has(data.category)) {
    addIssue(issues, fileName, "category must be a valid CategoryId");
  }

  if (!isNonEmptyString(data.summary)) {
    addIssue(issues, fileName, "summary must be a non-empty string");
  }

  if (!validateStringArray(data.tags)) {
    addIssue(issues, fileName, "tags must be a non-empty string array");
  }

  if (!validateStringArray(data.systems, validSystems)) {
    addIssue(issues, fileName, "systems must be a non-empty valid system array");
  }

  if (!validDifficulties.has(data.difficulty)) {
    addIssue(issues, fileName, "difficulty must be 入门, 进阶, or 专题");
  }

  if (!isNonEmptyString(data.updatedAt)) {
    addIssue(issues, fileName, "updatedAt must be a non-empty string");
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updatedAt)) {
    addIssue(issues, fileName, "updatedAt should use YYYY-MM-DD format");
  }

  if (data.order !== undefined) {
    if (typeof data.order !== "number" || Number.isNaN(data.order)) {
      addIssue(issues, fileName, "order must be a number when present");
    } else {
      const previousFileName = seenOrders.get(data.order);

      if (previousFileName) {
        addIssue(
          issues,
          fileName,
          `duplicate order "${data.order}" also used by ${previousFileName}`,
        );
      } else {
        seenOrders.set(data.order, fileName);
      }
    }
  }
}

function main() {
  if (!fs.existsSync(cardsDirectory)) {
    console.error("content/cards directory does not exist.");
    process.exit(1);
  }

  const fileNames = fs
    .readdirSync(cardsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .sort();
  const issues = [];
  const seenSlugs = new Map();
  const seenOrders = new Map();

  for (const fileName of fileNames) {
    const filePath = path.join(cardsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    validateCard(fileName, data, seenSlugs, seenOrders, issues);
  }

  if (issues.length > 0) {
    console.error("Card validation failed:");

    for (const issue of issues) {
      console.error(`- ${issue}`);
    }

    process.exit(1);
  }

  console.log(`Validated ${fileNames.length} card(s). No issues found.`);
}

main();
