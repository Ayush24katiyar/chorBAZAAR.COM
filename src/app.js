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
import productRoutes from "../src/routes/product.routes.js"
import cartRoutes from "../src/routes/cart.routes.js"
import orderRoutes from "../src/routes/order.routes.js"


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/product"  , productRoutes)
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/order", orderRoutes)



export { app }