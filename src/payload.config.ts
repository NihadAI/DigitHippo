import { buildConfig } from "payload/config";
import {mongooseAdapter} from "@payloadcms/db-mongodb"
import {slateEditor} from "@payloadcms/richtext-slate"
import {webpackBundler} from "@payloadcms/bundler-webpack"
import path from "path";
import { Users } from "./collections/users";
import dotenv from 'dotenv'
import { Products } from "./collections/products/Products";
import { Media } from "./collections/media";
import { ProductFiles } from "./collections/productFile";
import { Orders } from "./collections/orders";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})


export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_URL || ' ',
    collections: [Users, Products, Media, ProductFiles, Orders],
    routes: {
        admin: '/sell',
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "-DigitHippo",
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg"
        }
    },
    rateLimit: {
        max: 2000
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGO_URL!,

    }),
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts")
    }
})