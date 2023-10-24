import { PrismaClient } from "@prisma/client";
import { SAMA_FRAMWORK, ASSASSEMENET_OBJECTIVE_SEED, CATEGORY_SEED, CONTROLE_SEED, EVIDENCE_SEED, FRAMWORKS_SEED, MATURITY_LEVELS_SEED, RISK_STATUS_SEED, SUBCATEGORY_SEED } from "./data";


const prisma = new PrismaClient();

async function main() {

  await prisma.$transaction([
    prisma.control.deleteMany(),
    prisma.framework.deleteMany(),
    prisma.maturityLevel.deleteMany(),
    prisma.evidence.deleteMany(),
    prisma.category.deleteMany(),
    prisma.subCategory.deleteMany(),
    prisma.riskStatus.deleteMany(),
    prisma.assessmentObjectives.deleteMany(),
    prisma.controlAssessmentObjective.deleteMany(),
  ])


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

  const framework = await prisma.framework.create({
    data: {
      name: SAMA_FRAMWORK.name,
      description: SAMA_FRAMWORK.description,
      additional_information: SAMA_FRAMWORK.additional_information,
    }
  })

  await prisma.control.createMany({
    data: SAMA_FRAMWORK.controls.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      methods: c.methods,
      question: c.question,
      category: c.category,
      weight: c.weight,
      frameworkId: framework.id,
      group: c.group,
    }))
  })

  await prisma.assessmentObjectives.createMany({
    data: SAMA_FRAMWORK.objectives.map(o => ({
      id: o.id,
      controlId: o.controlId,
      objective: o.objective,
    }))
  })

  await prisma.controlAssessmentObjective.createMany({
    data: SAMA_FRAMWORK.objectives.map(o => ({
      assessmentObjectiveId: o.id,
      controlId: o.controlId,
    }))
  })

  // const listAssessmentObjectives = SAMA_FRAMWORK.objectives.map(o => o.id)
  // const found: string[] = []
  // const alreadyFound: string[] = []
  // for (const id of listAssessmentObjectives) {
  //   if (alreadyFound.includes(id)) continue
  //   const count = listAssessmentObjectives.filter(o => o === id).length
  //   if (count > 1) {
  //     found.push(id)
  //   }
  //   alreadyFound.push(id)
  // }
  // console.log(listAssessmentObjectives.length)
  // console.log(found.length)
  // console.log(alreadyFound.length)
  // console.log(found)


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