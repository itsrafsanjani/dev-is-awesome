import { prisma } from "@/configs/prisma";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => ({
  req: opts?.req,
  res: opts?.res,
  prisma,
});

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
