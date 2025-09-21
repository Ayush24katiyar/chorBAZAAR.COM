import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

import { 
    DeleteProductFromCart ,
    AddProductToCart ,
    ListTheCart
 } from "../controllers/CART.controllers.js";



const router = Router()

router.route("/").get(verifyJWT , ListTheCart)
router.route("/add").post(verifyJWT , AddProductToCart)
router.route("/delete").delete(verifyJWT , DeleteProductFromCart)



 export default router