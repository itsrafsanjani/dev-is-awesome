import { AppRouter } from "@/server/routes/app";
import { createReactQueryHooks } from "@trpc/react";
import superjson from "superjson";

export const trpc = createReactQueryHooks<AppRouter>();

export const transformer = superjson;
