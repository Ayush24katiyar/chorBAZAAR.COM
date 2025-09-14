import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { requiredROLE } from "./middlewares/roles.middlewares.js"

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended : true , limit : "16kb"}))

app.use(express.static("public"))

app.use(cors({
    origin : process.env.CROS_ORIGIN ,
    Credential : true

}))

app.use(cookieParser())

import userRoutes from "../src/routes/user.routes.js"
import porductRoutes from "../src/routes/product.routes.js"
import { verifyJWT } from "./middlewares/auth.middlewares.js"

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/product" ,verifyJWT , requiredROLE('seller') , porductRoutes)




export { app }