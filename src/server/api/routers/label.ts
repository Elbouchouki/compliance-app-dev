import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const labelRouter = router({
  getAll: publicProcedure.input(
    z.object({ userId: z.optional(z.string()) })
  ).query(({ input }) => {
    return prisma.label.findMany({
      where: {
        userId: input.userId,
      },
    });
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.label.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  addOrUpdate: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      key: z.string(),
      value: z.string(),
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    if (input.id) {
      return prisma.label.update({
        where: {
          id: input.id,
        },
        data: {
          key: input.key,
          value: input.value,
        },
      });
    } else {
      return prisma.label.create({
        data: {
          key: input.key,
          value: input.value,
          userId: input.userId,
        },
      });
    }
  }),

  add: publicProcedure.input(
    z.object({
      key: z.string(),
      value: z.string(),
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    return prisma.label.create({
      data: {
        key: input.key,
        value: input.value,
        userId: input.userId,
      },
    });
  }),

  update: publicProcedure.input(
    z.object({
      id: z.string(),
      key: z.string(),
      value: z.string(),
    })
  ).mutation(({ input }) => {
    return prisma.label.update({
      where: {
        id: input.id,
      },
      data: {
        key: input.key,
        value: input.value,
      },
    });
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return prisma.label.delete({
      where: {
        id: input.id,
      },
    });
  }),

});