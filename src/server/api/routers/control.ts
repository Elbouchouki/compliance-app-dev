import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const controlRouter = router({

  getAll: publicProcedure.query(() => {
    return prisma.control.findMany(
    );
  }),

  updateControlObjective: publicProcedure.input(
    z.object({
      assessmentObjectiveId: z.string(),
      controlId: z.string(),
      assessmentScopeId: z.string(),
      choice: z.string(),
      explaination: z.string().optional()
    })
  ).mutation(async ({ input }) => {
    return prisma.controlAssessmentScopeObjectives.update({
      where: {
        assessmentScopeId_assessmentObjectiveId_controlId: {
          assessmentScopeId: input.assessmentScopeId,
          assessmentObjectiveId: input.assessmentObjectiveId,
          controlId: input.controlId
        }
      },
      data: {
        choices: input.choice,
        explination: input.explaination
      }
    });
  }),


  getControlsByAssessmentScopeAndId: publicProcedure.input(
    z.object({ assessmentScopeId: z.string(), id: z.string() })
  ).query(({ input }) => {
    return prisma.controlAssessmentScope.findUnique({
      where: {
        assessmentScopeId_controlId: {
          assessmentScopeId: input.assessmentScopeId,
          controlId: input.id
        }
      }, include: {
        assessmentScope: {
          include: {
            ControlAssessmentScopeObjectives: {
              include: {
                assessmentObjective: true
              }
            }
          }
        },
        control: {
          include: {
            assessments: {
              include: {
                assessmentObjective: true
              }
            },
            Framework: true
          }
        },
        maturity: true,
        targetMaturity: true,
      }
    });
  }),

  getControlsByAssessmentScope: publicProcedure.input(
    z.object({ assessmentScopeId: z.string() })
  ).query(({ input }) => {
    return prisma.controlAssessmentScope.findMany({
      where: {
        assessmentScopeId: input.assessmentScopeId
      }, include: {
        control: {
          include: {
            assessments: {
              include: {
                assessmentObjective: true
              }
            },
            Framework: true
          }
        },
        maturity: true,
        targetMaturity: true
      }
    });
  }),

  getAllByFrameworkId: publicProcedure.input(
    z.object({ frameworkIds: z.array(z.string()) })
  ).query(({ input }) => {
    return prisma.control.findMany({
      where: {
        frameworkId: {
          in: input.frameworkIds
        }
      },
    });
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.control.findUnique({
      where: {
        id: input.id,
      },
    });
  }),
});