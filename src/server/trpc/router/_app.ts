// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { markerRouter } from "./marker";
import { userRouter } from "./user";

export const appRouter = router({
  marker: markerRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
