import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { protectedProcedure } from "../trpc";
import { getSession, useSession } from "next-auth/react";
import { link } from "fs";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input: { limit = 500 }, ctx }) => {
      try {
        const users = await ctx.prisma.user.findMany({
          take: limit,
          select: {
            id: true,
            name: true,
            image: true,
          },
        });
        return { users };
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }),
});
