import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { protectedProcedure } from "../trpc";
import { getSession, useSession } from "next-auth/react";
import { link } from "fs";

export const tweetRouter = createTRPCRouter({
  getTweets: publicProcedure
    .input(z.object({ limit: z.number().optional(), cursor: z.object({ id: z.string(), createdAt: z.date() }).optional() }))
    .query(async ({ input: { limit = 500, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      try {
        const tweets = await ctx.prisma.tweet.findMany({
          take: limit + 1,
          cursor: cursor ? { createdAt_id: cursor } : undefined,
          orderBy: [{ createdAt: "desc" }],
          select: {
            id: true,
            content: true,
            createdAt: true,
            _count: { select: { likes: true } },
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              }
            },
            likes: currentUserId == null ? false : { where: {userId: currentUserId} },
          },
        });
        let nextCursor : typeof cursor | undefined ;
        if (tweets.length > limit) {
          const nextItem = tweets[limit + 1];
          if (nextItem) {
            nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
          }
        }
        return {tweets: tweets.map(tweet => {
          return {
            id: tweet.id,
            content: tweet.content,
            createdAt: tweet.createdAt,
            likeCount: tweet._count.likes,
            user: tweet.user,
            likedByMe: tweet.likes !== undefined && tweet.likes.length > 0,
          }
        }), nextCursor };
      } catch (error) {
        console.error("Error fetching tweets:", error);
        throw error;
      }

    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(async ({ input: { content }, ctx }) => {
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
        console.log("An error occurred:", error);
        console.error(error);
      }
    }),
});
