import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


// USER

import { 
    registerUSER ,
    loginUSER ,
    logoutUSER

 } from "../controllers/USER.controllers.js";
 

 


 const router = Router()

 // USER ROUTES 

 router.route("/register").post(registerUSER)
 router.route("/login").post(verifyJWT , loginUSER)
 router.route("/logout").post(verifyJWT ,  logoutUSER)


 export default router;