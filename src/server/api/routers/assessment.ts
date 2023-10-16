import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";
import { MaturityLevel } from "@/types";
import { MATURITY_LEVELS_MOCK } from "@/mock";

export const assessmentRouter = router({
  getAllAssessments: publicProcedure.input(
    z.object({ userId: z.optional(z.string()) })
  ).query(({ input }) => {
    return prisma.assessmentScope.findMany({
      where: {
        userId: input.userId,
      },
      include: {
        ControlAssessmentScope: {
          include: {
            maturity: true,
          }
        },
      }
    });
  }),

  getAssessment: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.assessmentScope.findUnique({
      where: {
        id: input.id,
      },
      include: {
        ControlAssessmentScope: {
          include: {
            maturity: true,
            targetMaturity: true,
            control: true
          }
        }
      }
    });
  }),

  updateAssessment: publicProcedure.input(
    z.object({
      id: z.string(),
      controlId: z.string(),
      remediationPlanText: z.optional(z.string()),
      notesText: z.optional(z.string()),
      policiesText: z.optional(z.string()),
      proceduresText: z.optional(z.string()),
      standardsText: z.optional(z.string())
    })
  ).mutation(async ({ input }) => {
    return prisma.controlAssessmentScope.update({
      where: {
        assessmentScopeId_controlId: {
          assessmentScopeId: input.id,
          controlId: input.controlId
        }
      },
      data: {
        remediationPlanText: input.remediationPlanText,
        notesText: input.notesText,
        policiesText: input.policiesText,
        proceduresText: input.proceduresText,
        standardsText: input.standardsText
      }
    });
  }),

  calculareMaturity: publicProcedure.input(
    z.object({
      id: z.string(),
      controlId: z.string()
    })
  ).mutation(async ({ input }) => {

    console.log("calculareMaturity", input.id)
    const assessmentScope = await prisma.assessmentScope.findUnique({
      where: {
        id: input.id,
      },
      include: {
        ControlAssessmentScopeObjectives: {
          include: {
            assessmentObjective: true
          }
        },
      }
    });

    const objectives = assessmentScope?.ControlAssessmentScopeObjectives.filter(o => o.controlId === input.controlId).map(o => o.choices) || []
    const NotAnswered = objectives.filter(o => o === '').length || 0

    if (objectives && NotAnswered === 0) {
      const objectivesTotal = objectives.length || 0
      let maturityLevel: MaturityLevel | undefined = undefined
      const notMet = objectives.filter(o => o === "Not Met").length || 0
      const met = objectives.filter(o => o === "Met").length || 0
      const notApplicable = objectives.filter(o => o === "Not Applicable").length || 0
      const compensatingControl = objectives.filter(o => o === "Compensating Control").length || 0

      let flag = true
      let L = 1;
      if (flag && notMet !== 0) {
        maturityLevel = MATURITY_LEVELS_MOCK[L + 0]
        flag = false
      }
      if (flag && notApplicable > 0 && notApplicable < objectivesTotal) {
        maturityLevel = MATURITY_LEVELS_MOCK[L + 2]
        flag = false
      }
      if (flag && notApplicable === objectivesTotal) {
        maturityLevel = MATURITY_LEVELS_MOCK[L + 1]
        flag = false
      }
      if (flag && met === objectivesTotal) {
        maturityLevel = MATURITY_LEVELS_MOCK[L + 3]
        flag = false
      }
      if (flag && compensatingControl > 0 && compensatingControl < objectivesTotal && notMet === 0 && notApplicable === 0) {
        maturityLevel = MATURITY_LEVELS_MOCK[L + 4]
        flag = false
      }
      if (flag && compensatingControl === objectivesTotal) {
        maturityLevel = MATURITY_LEVELS_MOCK[L + 5]
        flag = false
      }


      await prisma.controlAssessmentScope.update({
        where: {
          assessmentScopeId_controlId: {
            assessmentScopeId: input.id,
            controlId: input.controlId
          }
        },
        data: {
          maturityId: maturityLevel?.id as string,
          maturityFilter: maturityLevel?.value as string,
        }
      });

      // await prisma.assessmentScope.update({
      //   where: {
      //     id: input.id,
      //   },
      //   data: {
      //     ControlAssessmentScope: {
      //       update: {
      //         data: {
      //           maturityId: maturityLevel?.id as string,
      //           maturityFilter: maturityLevel?.value as string,
      //         }
      //       }
      //     }
      //   },
      // });

    }


  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(async ({ input }) => {

    await prisma.controlAssessmentScope.deleteMany({
      where: {
        assessmentScopeId: input.id
      }
    })

    await prisma.controlAssessmentScopeObjectives.deleteMany({
      where: {
        assessmentScopeId: input.id
      }
    })

    return prisma.assessmentScope.delete({
      where: {
        id: input.id,
      },
    });
  }),

  createControlsObjective: publicProcedure.input(
    z.object({
      assessmentScopeId: z.string(),
      controls: z.array(z.string()),
    })
  ).mutation(async ({ input }) => {

    const controls = await prisma.control.findMany({
      where: {
        id: {
          in: input.controls
        }
      },
      include: {
        assessments: {
          include: {
            assessmentObjective: {
              include: {
                controls: true
              }
            }
          }
        }
      }
    })

    const controlObjectives: Prisma.ControlAssessmentScopeObjectivesCreateManyInput[] = []

    controls.map(control => {
      control.assessments?.map(assessment => {
        controlObjectives.push({
          assessmentObjectiveId: assessment.assessmentObjectiveId,
          assessmentScopeId: input.assessmentScopeId,
          controlId: assessment.controlId,
          choices: "",
          explination: ""
        })
      })
    })

    await prisma.controlAssessmentScopeObjectives.createMany({
      data: controlObjectives
    })

  }),



  addOrUpdateAssessment: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      name: z.string(),
      description: z.string(),
      reportingFrom: z.string(),
      reportingTo: z.string(),
      status: z.optional(z.string()),
      type: z.optional(z.string()),
      userId: z.optional(z.string()),
      controls: z.optional(z.array(z.string())),
    })
  ).mutation(({ input }) => {
    if (!input.id) {
      return prisma.assessmentScope.create({
        data: {
          name: input.name,
          description: input.description,
          reportingFrom: input.reportingFrom,
          reportingTo: input.reportingTo,
          status: input.status,
          type: input.type,
          userId: input.userId,
          ControlAssessmentScope: {
            create: input.controls?.map((controlId) => {
              return {
                controlId: controlId,
                maturityId: "Unanswered",
                targetMaturityId: "Unanswered",
                maturityFilter: "Unanswered",
              }
            })
          },
        }
      })
    }
    return prisma.assessmentScope.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        description: input.description,
        reportingFrom: input.reportingFrom,
        reportingTo: input.reportingTo,
        status: input.status,
        type: input.type,
      },
    });
  })
});