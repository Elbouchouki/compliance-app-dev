import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";

export const frameworkRouter = router({

  getAll: publicProcedure.query(() => {
    return prisma.framework.findMany(
      {
        include: {
          controls: true
        }
      }
    );
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {
    return prisma.framework.findUnique({
      where: {
        id: input.id,
      },
    });
  }),
});