import { Framework, MaturityLevel, Prisma } from "@prisma/client";
import frameworksJson from "./json/frameworks.json";
import controlJson from "./json/controls.json";
import evidenceJson from "./json/evidence.json";
import assessmentObjectiveJson from "./json/assessmentObjective.json";
import categoriesJson from "./json/categories.json";
import subcategoriesJson from "./json/sub-categories.json";
import riskStatusJson from "./json/risk-status.json";
import { faker } from "@faker-js/faker";

export const FRAMWORKS_SEED: Prisma.FrameworkCreateManyInput[] = frameworksJson.map((framework) => ({
  name: framework.name,
  description: framework.name + " " + faker.lorem.paragraph({ min: 1, max: 3 }),
  additional_information: faker.lorem.paragraph(
    faker.number.int({ min: 2, max: 5 })
  ),
}))

export const MATURITY_LEVELS_SEED: Prisma.MaturityLevelCreateManyInput[] = [
  {
    id: "Unanswered",
    label: "Unanswered",
    value: "unanswered",
    color: "bg-gray-500 hover:bg-gray-600",
    description: ""
  },
  {
    id: "L0",
    label: "Not Performed",
    value: "notPerformed",
    color: "bg-red-500 hover:bg-red-600",
    description: "Practices are non-existent. A reasonable person would conclude the control is not being performed."
  },
  {
    id: "L1",
    label: "Performed Informally",
    value: "performedInformally",
    color: "bg-yellow-500 hover:bg-yellow-600",
    description: "Practices are “ad hoc” where the intent of the control is not met due to a lack of consistency and formality. A reasonable person would conclude the control is not consistently performed in a structured manner. "
  },
  {
    id: "L2",
    label: "Planned & Tracked",
    value: "plannedAndTracked",
    color: "bg-green-500 hover:bg-green-600",
    description: "Practices are “requirements-driven” where the intent of control is met in some circumstances, but not standardized across the entire organization."
  },
  {
    id: "L3",
    label: "Well Defined",
    value: "wellDefined",
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Practices are standardized “enterprise-wide” where the control is well-defined and standardized across the entire organization. "
  },
  {
    id: "L4",
    label: "Quantitatively Controlled",
    value: "quantitativelyControlled",
    color: "bg-indigo-500 hover:bg-indigo-600",
    description: "Practices are “metrics-driven” where the control builds on L3 maturity, but has detailed metrics to enable governance oversight. "
  },
  {
    id: "L5",
    label: "Continuously Improving",
    value: "continuouslyImproving",
    color: "bg-purple-500 hover:bg-purple-600",
    description: "Practices are “world-class” where the control builds on L4 maturity, but is continuously improving through automation (e.g., AI, machine learning, etc.) "
  }
]

export const CATEGORY_SEED: Prisma.CategoryCreateManyInput[] = categoriesJson.map(
  (category) => ({
    id: category.id,
    value: category.value,
  })
)

export const SUBCATEGORY_SEED: Prisma.subCategoryCreateManyInput[] = subcategoriesJson.map(
  (sub) => ({
    id: sub.id,
    value: sub.value,
    categoryId: sub.categoryId
  })
)

export const RISK_STATUS_SEED: Prisma.RiskStatusCreateManyInput[] = riskStatusJson.map(
  (s) => ({
    id: s.id,
    value: s.value
  })
)

export const ASSASSEMENET_OBJECTIVE_SEED: Prisma.AssessmentObjectivesCreateManyInput[] = assessmentObjectiveJson.map(
  (assessment) => ({
    id: assessment.id,
    controlId: assessment.controlId,
    objective: assessment.objective,
  })
)

export const EVIDENCE_SEED: Prisma.EvidenceCreateManyInput[] = evidenceJson.map((evidence) => ({
  name: evidence.name,
  reference: evidence.ref,
  description: evidence.description,
  content: evidence.content,
}))

export const CONTROLE_SEED = (
  MATURITY_LEVELS: MaturityLevel[],
  FRAMWORKS: Framework[],
): Prisma.ControlCreateManyInput[] => controlJson.map((control) => {
  return {
    id: control.id,
    name: control.name,
    description: control.description,
    methods: control.methods,
    question: control.question,
    category: control.category,
    frameworkId: FRAMWORKS[Math.floor(Math.random() * FRAMWORKS.length)].id,
    group: control.group,
    weight: control.weight,
  }
})