import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const riskRouter = router({
  getAll: publicProcedure.input(
    z.object({ userId: z.optional(z.string()) })
  ).query(({ input }) => {
    return prisma.risk.findMany({
      where: {
        userId: input.userId
      }
    })
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.risk.findUnique({
      where: {
        id: input.id,
      }
    })
  }),

  getLimited: publicProcedure.input(
    z.object({ userId: z.string() })
  ).query(({ input }) => {
    return prisma.risk.findMany({
      take: 5,
      where: {
        userId: input.userId,
      }
    })
  }),

  getByUserId: publicProcedure.input(
    z.object({ riskScopeId: z.string(), userId: z.string() })
  ).query(({ input }) => {
    return prisma.risk.findMany({
      where: {
        riskAssessmentScopeId: input.riskScopeId,
        userId: input.userId,
      }
    })
  }),

  getByAssessmentScope: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.risk.findMany({
      where: {
        riskAssessmentScopeId: input.id
      }
    })
  }),

  addOrUpdate: publicProcedure.input(
    z.object({
      id: z.string(),
      riskName: z.string(),
      description: z.string(),
      consequences: z.string(),
      affectedAsset: z.string(),
      category: z.string(),
      subcategory: z.string(),
      riskStatus: z.string(),
      impact: z.coerce.number(),
      likelihood: z.coerce.number(),
      owner: z.string(),
      riskAssessmentScope: z.optional(z.string()),
      userId: z.optional(z.string()),
      tagId: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    if (input.id) {
      return prisma.risk.update({
        where: {
          id: input.id,
        },
        data: {
          riskName: input.riskName,
          description: input.description,
          consequences: input.consequences,
          affectedAsset: input.affectedAsset,
          categoryId: input.category,
          subCategoryId: input.subcategory,
          riskStatusId: input.riskStatus,
          impact: input.impact,
          likelihood: input.likelihood,
          owner: input.owner,
          userId: input.userId,
          tagId: input.tagId || null,
          riskAssessmentScopeId: input.riskAssessmentScope,
        },
      });
    } else {
      return prisma.risk.create({
        data: {
          riskName: input.riskName,
          description: input.description,
          consequences: input.consequences,
          affectedAsset: input.affectedAsset,
          categoryId: input.category,
          subCategoryId: input.subcategory,
          riskStatusId: input.riskStatus,
          impact: input.impact,
          likelihood: input.likelihood,
          owner: input.owner,
          userId: input.userId,
          tagId: input.tagId,
          riskAssessmentScopeId: input.riskAssessmentScope,
        },
      })
    }
  }),

  add: publicProcedure.input(
    z.object({
      riskName: z.string(),
      description: z.string(),
      consequences: z.string(),
      affectedAsset: z.string(),
      category: z.string(),
      subcategory: z.string(),
      riskAssessmentScopeId: z.optional(z.string()),
      riskStatus: z.string(),
      impact: z.coerce.number(),
      likelihood: z.coerce.number(),
      owner: z.string(),
      userId: z.optional(z.string()),
      tagId: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    return prisma.risk.create({
      data: {
        riskName: input.riskName,
        description: input.description,
        consequences: input.consequences,
        affectedAsset: input.affectedAsset,
        categoryId: input.category,
        subCategoryId: input.subcategory,
        riskStatusId: input.riskStatus,
        riskAssessmentScopeId: input.riskAssessmentScopeId,
        impact: input.impact,
        likelihood: input.likelihood,
        owner: input.owner,
        userId: input.userId,
        tagId: input.tagId,
      },
    })
  }),

  update: publicProcedure.input(
    z.object({
      id: z.string(),
      riskName: z.string(),
      description: z.string(),
      consequences: z.string(),
      affectedAsset: z.string(),
      category: z.string(),
      subcategory: z.string(),
      riskStatus: z.string(),
      impact: z.coerce.number(),
      likelihood: z.coerce.number(),
      owner: z.string(),
      userId: z.optional(z.string()),
      riskAssessmentScopeId: z.optional(z.string()),
      tagId: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    return prisma.risk.update({
      where: {
        id: input.id,
      },
      data: {
        riskName: input.riskName,
        description: input.description,
        consequences: input.consequences,
        affectedAsset: input.affectedAsset,
        categoryId: input.category,
        subCategoryId: input.subcategory,
        riskStatusId: input.riskStatus,
        impact: input.impact,
        likelihood: input.likelihood,
        userId: input.userId,
        owner: input.owner,
        tagId: input.tagId,
        riskAssessmentScopeId: input.riskAssessmentScopeId,
      },
    })
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return prisma.risk.delete({
      where: {
        id: input.id,
      },
    });
  }),
});