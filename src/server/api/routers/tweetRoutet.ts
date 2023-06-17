import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { protectedProcedure } from "../trpc";
import { getSession, useSession } from "next-auth/react";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(async ({input : {content}, ctx}) => {
      try {
        const userId = ctx.session.user.id;

        if (userId) {
          return await ctx.prisma.tweet.create({
            data: {
              content: content,
              userId: userId,
            },
          });
        } else {
          throw new Error("User session not found");
        }
      } catch (error) {
        console.log(error);
      }
    }),
});
