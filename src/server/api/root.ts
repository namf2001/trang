import { postRouter } from "@/server/api/routers/post";
import { countryRouter } from "@/server/api/routers/country";
import { categoryRouter } from "@/server/api/routers/category";
import { countryUrlRouter } from "@/server/api/routers/countryUrl";
import { categoryUrlRouter } from "@/server/api/routers/categoryUrl";
import { xtreamUrlRouter } from "@/server/api/routers/xtreamUrl";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  country: countryRouter,
  category: categoryRouter,
  countryUrl: countryUrlRouter,
  categoryUrl: categoryUrlRouter,
  xtreamUrl: xtreamUrlRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
