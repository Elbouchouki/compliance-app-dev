import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const riskAssessmentScopeRouter = router({
  getAll: publicProcedure.input(
    z.object({ userId: z.optional(z.string()) })
  ).query(({ input }) => {
    return prisma.riskAssessmentScope.findMany({
      where: {
        userId: input.userId
      }
    })
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.riskAssessmentScope.findUnique({
      where: {
        id: input.id,
      }
    })
  }),

  addOrUpdate: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
      }),
      description: z.string().min(4, {
        message: "Description must be at least 4 characters.",
      }),
      reportingFrom: z.string(),
      reportingTo: z.string(),
      status: z.enum(["planned", "in-progress", "completed"], {
        required_error: "Status is required"
      }).optional(),
      type: z.enum(["entreprise-wide", "operational", "information-security", "financial", "compliance", "project", "hazard"], {
        required_error: "Type is required"
      }),
      userId: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    if (input.id) {
      return prisma.riskAssessmentScope.update({
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
    } else {
      return prisma.riskAssessmentScope.create({
        data: {
          name: input.name,
          description: input.description,
          userId: input.userId,
          reportingFrom: input.reportingFrom,
          reportingTo: input.reportingTo,
          status: input.status ?? "",
          type: input.type,
        },
      })
    }
  }),

  add: publicProcedure.input(
    z.object({
      name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
      }),
      description: z.string().min(4, {
        message: "Description must be at least 4 characters.",
      }),
      reportingFrom: z.string(),
      reportingTo: z.string(),
      status: z.enum(["planned", "in-progress", "completed"], {
        required_error: "Status is required"
      }).optional(),
      type: z.enum(["entreprise-wide", "operational", "information-security", "financial", "compliance", "project", "hazard"], {
        required_error: "Type is required"
      }),
      userId: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    return prisma.riskAssessmentScope.create({
      data: {
        name: input.name,
        description: input.description,
        reportingFrom: input.reportingFrom,
        reportingTo: input.reportingTo,
        status: input.status ?? "",
        type: input.type,
        userId: input.userId
      }
    })
  }),

  update: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
      }),
      description: z.string().min(4, {
        message: "Description must be at least 4 characters.",
      }),
      reportingFrom: z.string(),
      reportingTo: z.string(),
      status: z.enum(["planned", "in-progress", "completed"], {
        required_error: "Status is required"
      }).optional(),
      type: z.enum(["entreprise-wide", "operational", "information-security", "financial", "compliance", "project", "hazard"], {
        required_error: "Type is required"
      }),
    })
  ).mutation(({ input }) => {
    return prisma.riskAssessmentScope.update({
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
    })
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return prisma.riskAssessmentScope.delete({
      where: {
        id: input.id,
      },
    });
  }),
});