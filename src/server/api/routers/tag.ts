import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const tagRouter = router({
  getAll: publicProcedure.input(
    z.object({ userId: z.optional(z.string()) })
  ).query(({ input }) => {
    return prisma.tag.findMany({
      where: {
        userId: input.userId,
      },
    });
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.tag.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  addOrUpdate: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      name: z.string(),
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    if (input.id) {
      return prisma.tag.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    } else {
      return prisma.tag.create({
        data: {
          name: input.name,
          userId: input.userId,
        },
      });
    }
  }),

  add: publicProcedure.input(
    z.object({
      name: z.string(),
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    return prisma.tag.create({
      data: {
        name: input.name,
        userId: input.userId,
      },
    });
  }),

  update: publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string()
    })
  ).mutation(({ input }) => {
    return prisma.tag.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    });
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return prisma.tag.delete({
      where: {
        id: input.id,
      },
    });
  }),

});