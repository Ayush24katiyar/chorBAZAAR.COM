import { Router } from "express";

import { 
    registerPRODUCT, 
    getPRODUCT,

} from "../controllers/PRODUCT.controllers.js";


const router = Router()

router.route("/add").post(registerPRODUCT)
router.route("/list").get(getPRODUCT)

export default router;