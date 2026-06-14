const contractLawTopic = {
  title: "合同法专题",
  cardCount: 12,
  categoryId: "civil",
  categoryPath: "/category/civil",
  overviewPath: "/topics/contract-law",
};

const contractLawStages = [
  {
    id: "contract-formation-basics",
    title: "合同成立基础",
    description: "理解合同如何从交易接触、要约、承诺到可执行基础逐步形成。",
    readingGoal: "先理解合同如何从交易接触走向成立。",
    slugs: ["invitation-to-treat", "offer", "acceptance", "consideration"],
  },
  {
    id: "contract-content-validity",
    title: "合同内容、解释与效力",
    description: "理解合同文本如何被解释，标准化条款如何受到控制，以及合同是否有效。",
    readingGoal: "再理解合同文本如何被解释、限制和评价。",
    slugs: ["contract-interpretation", "standard-terms", "contract-validity"],
  },
  {
    id: "breach-and-remedies",
    title: "违约与救济",
    description: "理解违约发生后责任如何判断，合同关系如何退出，以及损害如何被赔偿。",
    readingGoal: "最后理解违约发生后如何退出合同和计算赔偿。",
    slugs: ["breach-of-contract", "contract-termination", "damages"],
  },
  {
    id: "advanced-special-issues",
    title: "进阶专题与特殊情形",
    description: "理解不可抗力、合同成立特殊场景等不属于基础路径但会影响实务判断的进阶问题。",
    readingGoal: "最后补充理解合同法中的例外情形、风险分配和复杂交易场景。",
    slugs: ["force-majeure", "contract-formation-special-cases"],
  },
];

module.exports = {
  contractLawStages,
  contractLawTopic,
};
