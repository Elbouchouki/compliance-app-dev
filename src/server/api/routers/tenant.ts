import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const tenantRouter = router({
  getAll: publicProcedure.input(
    z.object({ userId: z.optional(z.string()) })
  ).query(({ input }) => {
    return prisma.tenant.findMany({
      where: {
        userId: input.userId,
      },
    });
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.tenant.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  addOrUpdate: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      name: z.string(),
      reference: z.optional(z.string()),
      contact_email: z.string(),
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    if (input.id) {
      return prisma.tenant.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          reference: input.reference,
          contact_email: input.contact_email,
          userId: input.userId,
        },
      });
    } else {
      return prisma.tenant.create({
        data: {
          name: input.name,
          reference: input.reference,
          contact_email: input.contact_email,
          userId: input.userId,
        },
      });
    }
  }),

  add: publicProcedure.input(
    z.object({
      name: z.string(),
      reference: z.optional(z.string()),
      contact_email: z.string(),
      userId: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    return prisma.tenant.create({
      data: {
        name: input.name,
        reference: input.reference,
        contact_email: input.contact_email,
        userId: input.userId,
      },
    });
  }),

  update: publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      reference: z.optional(z.string()),
      contact_email: z.string(),
      userId: z.optional(z.string())

    })
  ).mutation(({ input }) => {
    return prisma.tenant.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        reference: input.reference,
        contact_email: input.contact_email,
        userId: input.userId,
      },
    });
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return prisma.tenant.delete({
      where: {
        id: input.id,
      },
    });
  }),

});