import { prisma } from "@/configs/prisma";
import { appRouter } from "@/server/routes/app";
import { createContext } from "@/server/trpc";
import * as trpcNext from "@trpc/server/adapters/next";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  teardown: () => prisma.$disconnect(),
});
