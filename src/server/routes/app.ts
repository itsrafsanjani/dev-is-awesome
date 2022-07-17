import { transformer } from "@/utils/trpc";
import { createRouter } from "../trpc";
import { tagsRoute } from "./tags";

export const appRouter = createRouter()
  .transformer(transformer)
  .merge("tags.", tagsRoute);

export type AppRouter = typeof appRouter;
