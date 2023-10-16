import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const policyRouter = router({
  getAll: publicProcedure.input(
    z.object({ userId: z.optional(z.string()) })
  ).query(({ input }) => {
    return prisma.policy.findMany({
      where: {
        userId: input.userId,
      },
    });
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.policy.findUnique({
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
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    if (input.id) {
      return prisma.policy.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          content: input.content,
          reference: input.reference,
          description: input.description,
          userId: input.userId,
        },
      });
    } else {
      return prisma.policy.create({
        data: {
          name: input.name,
          content: input.content,
          reference: input.reference,
          description: input.description,
          userId: input.userId,
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
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    return prisma.policy.create({
      data: {
        name: input.name,
        content: input.content,
        reference: input.reference,
        description: input.description,
        userId: input.userId,
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
      userId: z.optional(z.string())

    })
  ).mutation(({ input }) => {
    return prisma.policy.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        content: input.content,
        reference: input.reference,
        description: input.description,
        userId: input.userId,
      },
    });
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return prisma.policy.delete({
      where: {
        id: input.id,
      },
    });
  }),

});