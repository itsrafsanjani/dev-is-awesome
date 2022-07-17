import { z } from "zod";
import { createRouter } from "../trpc";

export const tagsRoute = createRouter()
  .query("all", {
    resolve({ ctx }) {
      return ctx.prisma.tag.findMany();
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.tag.findUnique({
        where: {
          tag: input.id,
        },
      });
    },
  });
