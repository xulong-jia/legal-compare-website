import topicData from "./contractLawTopicData";

export const contractLawTopic = topicData.contractLawTopic;
export const contractLawStages = topicData.contractLawStages;

export function getContractLawStageBySlug(slug: string) {
  return contractLawStages.find((stage) =>
    stage.slugs.some((stageSlug: string) => stageSlug === slug),
  );
}

export function getContractLawStageHref(slug: string) {
  const stage = getContractLawStageBySlug(slug);

  if (!stage) {
    return contractLawTopic.categoryPath;
  }

  return `${contractLawTopic.categoryPath}#${stage.id}`;
}

export function isContractLawCardSlug(slug: string) {
  return Boolean(getContractLawStageBySlug(slug));
}
