import { Router } from "express";

import { 
    registerPRODUCT, 
    getPRODUCT,

} from "../controllers/PRODUCT.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { requiredROLE } from "../middlewares/roles.middlewares.js";


const router = Router()

router.route("/add").post(verifyJWT , requiredROLE("seller"), registerPRODUCT)
router.route("/list").get(getPRODUCT)

export default router;