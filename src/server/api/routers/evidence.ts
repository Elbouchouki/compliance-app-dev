import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const evidenceRouter = router({
  getAll: publicProcedure.query(({ input }) => {
    return prisma.evidence.findMany();
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.evidence.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  addOrUpdate: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      name: z.string(),
      content: z.optional(z.string()),
      reference: z.optional(z.string()),
      description: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    if (input.id) {
      return prisma.evidence.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          content: input.content,
          reference: input.reference,
          description: input.description,
        },
      });
    } else {
      return prisma.evidence.create({
        data: {
          name: input.name,
          content: input.content,
          reference: input.reference,
          description: input.description,
        },
      });
    }
  }),

  add: publicProcedure.input(
    z.object({
      name: z.string(),
      content: z.optional(z.string()),
      reference: z.optional(z.string()),
      description: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    return prisma.evidence.create({
      data: {
        name: input.name,
        content: input.content,
        reference: input.reference,
        description: input.description,
      },
    });
  }),

  update: publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      content: z.optional(z.string()),
      reference: z.optional(z.string()),
      description: z.optional(z.string()),
    })
  ).mutation(({ input }) => {
    return prisma.evidence.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        content: input.content,
        reference: input.reference,
        description: input.description,
      },
    });
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return prisma.evidence.delete({
      where: {
        id: input.id,
      },
    });
  }),

});