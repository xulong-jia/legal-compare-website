import type { CategoryId } from "./types";

export type CategoryConfig = {
  id: CategoryId;
  name: string;
  description: string;
};

export const categories: CategoryConfig[] = [
  {
    id: "civil",
    name: "民法",
    description: "合同、物权、侵权、人格权、婚姻家庭与继承等私法制度对照。",
  },
  {
    id: "criminal",
    name: "刑法",
    description: "犯罪构成、刑罚制度、责任判断与中外刑事规则比较。",
  },
  {
    id: "procedure-evidence",
    name: "程序法与证据法",
    description: "民事诉讼、刑事诉讼、证据规则与司法程序制度对照。",
  },
  {
    id: "constitutional-administrative",
    name: "宪法与行政法",
    description: "国家机构、公法原则、行政行为、行政救济与比较公法制度。",
  },
  {
    id: "business",
    name: "商事与经济法",
    description: "公司、证券、破产、竞争、消费者保护与市场监管制度。",
  },
  {
    id: "international",
    name: "国际法与涉外法",
    description: "国际公法、国际私法、国际经济法与涉外法律制度。",
  },
];

export function getCategoryById(id: CategoryId): CategoryConfig | undefined {
  return categories.find((category) => category.id === id);
}
