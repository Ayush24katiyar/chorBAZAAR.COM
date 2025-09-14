import { Router } from "express";

import { 
    registerPRODUCT, 
    getPRODUCT,

} from "../controllers/PRODUCT.controllers";


const router = Router()

router.route("/add-product").post(registerPRODUCT)
router.route("/all-product").get(getPRODUCT)

export default router;