import { PrismaClient } from "@prisma/client";
import { ASSASSEMENET_OBJECTIVE_SEED, CATEGORY_SEED, CONTROLE_SEED, EVIDENCE_SEED, FRAMWORKS_SEED, MATURITY_LEVELS_SEED, RISK_STATUS_SEED, SUBCATEGORY_SEED } from "./data";

const prisma = new PrismaClient();

async function main() {
  await prisma.framework.createMany({
    data: FRAMWORKS_SEED
  })
  await prisma.maturityLevel.createMany({
    data: MATURITY_LEVELS_SEED
  })

  await prisma.evidence.createMany({
    data: EVIDENCE_SEED
  })

  await prisma.category.createMany({
    data: CATEGORY_SEED
  })
  // sub Category should named sub category of what, e.g RiskSubCategory
  await prisma.subCategory.createMany({
    data: SUBCATEGORY_SEED
  })

  await prisma.riskStatus.createMany({
    data: RISK_STATUS_SEED
  })

  const frameworks = await prisma.framework.findMany()
  const maturityLevels = await prisma.maturityLevel.findMany()
  await prisma.control.createMany({
    data: CONTROLE_SEED(maturityLevels, frameworks)
  })
  await prisma.assessmentObjectives.createMany({
    data: ASSASSEMENET_OBJECTIVE_SEED
  })
  await prisma.controlAssessmentObjective.createMany({
    data: ASSASSEMENET_OBJECTIVE_SEED.map(a => ({
      assessmentObjectiveId: a.id as string,
      controlId: a.controlId,
    }))
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });