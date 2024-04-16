import { User } from "@/payload-types";
import { ExpresContext } from "@/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { PayloadRequest } from "payload/types";

const trpc = initTRPC.context<ExpresContext>().create()

const middleware = trpc.middleware

const isAuth = middleware(async ({ ctx, next }) => {
    const req = ctx.req as PayloadRequest
  
    const { user } = req as { user: User | null }
  
    if (!user || !user.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
  
    return next({
      ctx: {
        user,
      },
    })
})
  

export const router = trpc.router
export const publicProcedure = trpc.procedure
export const privateProcedure = trpc.procedure.use(isAuth)