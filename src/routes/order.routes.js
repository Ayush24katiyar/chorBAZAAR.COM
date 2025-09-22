import { Router } from "express";
import { 
    OrderFromCart
 } from "../controllers/ORDER.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route("/cart").post(verifyJWT , OrderFromCart)

export default router
