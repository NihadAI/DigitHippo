import express from 'express'
import { getPayloadClient } from './get-payload'
import { nextApp, nextHandler } from './next-utils'
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from './trpc'
import { inferAsyncReturnType } from '@trpc/server'
import bodyParser from 'body-parser'
import { IncomingMessage } from 'http'
import { stripeWebhookHandler } from './webhooks'
import nextBuild from 'next/dist/build'

const app = express()
const PORT = Number(process.env.PORT) || 3000

const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions) => ({req, res})

export type ExpresContext = inferAsyncReturnType<typeof createContext>
export type WebhookRequest = IncomingMessage & {rawBody: Buffer}
const start = async () => {
    const webhookMiddleware = bodyParser.json({
        verify: (req: WebhookRequest, _, buffer) => {
            req.rawBody = buffer
        }
    })
    app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler)
    const payload = await getPayloadClient({
        initOptions:{
            express: app,
            onInit: async(cms) => {
                cms.logger.info(`admin url ${cms.getAdminURL()}`)
            }
        }
    })
    if (process.env.NEXT_BUILD) {
        app.listen(PORT, async ()=>{
            payload .logger.info("Next is  building for production")
            //@ts-expect-error
            await nextBuild(path.join(__dirname, '../'))
            process.exit()
        })
    }

    //middleware
    app.use("/api/trpc", trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    }))

    app.use((req, res) => nextHandler(req, res))

    nextApp.prepare().then(()=> {
        payload.logger.info("nextjs started")
        app.listen(PORT,async () => {
            payload.logger.info(`nextjs app url ${process.env.NEXT_PUBLIC_URL}`)
        })
    })
}

start()