import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { prisma } from "@/server/db";
import { clerkClient } from "@clerk/nextjs";

export const userRouter = router({
  getAll: publicProcedure.query(() => {
    return clerkClient.users.getUserList();
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({ input }) => {

  }),

  // addOrUpdate: publicProcedure.input(
  //   z.object({
  //     id: z.optional(z.string()),
  //     firstName: z.string(),
  //     lastName: z.string(),
  //     email: z.optional(z.string()),
  //     role: z.optional(z.string()),
  //     active: z.optional(z.boolean()),
  //     tenant: z.optional(z.string())
  //   })
  // ).mutation(({ input }) => {
  //   if (!input.id) {
  //     if (input.email) {
  //       clerkClient.emailAddresses.createEmailAddress({
  //         emailAddress: input.email,
  //         userId: input.id ?? "",
  //         primary: true,
  //       })
  //     }

  //     return clerkClient.users.createUser({
  //       firstName: input.firstName,
  //       skipPasswordChecks: true,
  //       skipPasswordRequirement: true,
  //       password: "password123",
  //       lastName: input.lastName,
  //       publicMetadata: {
  //         role: input.role,
  //         tenant: input.tenant,
  //       }
  //     })

  //   } else {
  //     return clerkClient.users.updateUser(input.id, {
  //       firstName: input.firstName,
  //       lastName: input.lastName,
  //       publicMetadata: {
  //         role: input.role,
  //         tenant: input.tenant
  //       }
  //     })
  //   }
  // }),

  // add: publicProcedure.input(
  //   z.object({
  //     name: z.string(),
  //     userId: z.optional(z.string())
  //   })
  // ).mutation(({ input }) => {

  // }),

  update: publicProcedure.input(
    z.object({
      id: z.optional(z.string()),
      firstName: z.string(),
      lastName: z.string(),
      email: z.optional(z.string()),
      role: z.optional(z.string()),
      active: z.optional(z.boolean()),
      tenant: z.optional(z.string())
    })
  ).mutation(({ input }) => {
    return clerkClient.users.updateUser(input.id ?? "", {
      firstName: input.firstName,
      lastName: input.lastName,
      publicMetadata: {
        role: input.role,
        tenant: input.tenant,
        active: input.active
      }
    })
  }),

  remove: publicProcedure.input(
    z.object({ id: z.string() })
  ).mutation(({ input }) => {
    return clerkClient.users.deleteUser(input.id)
  }),

  updateRole: publicProcedure.input(
    z.object({
      userId: z.string(),
      role: z.string()
    })
  ).mutation(({ input }) => {
    return clerkClient.users.updateUserMetadata(input.userId, {
      publicMetadata: {
        role: input.role
      }
    })
  })

});