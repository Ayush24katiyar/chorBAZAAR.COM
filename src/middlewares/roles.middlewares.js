import { asyncHandler } from "../utils/asynchandler.js"
import { apierror } from "../utils/APIerror.js"
const requiredROLE = (role) => asyncHandler(async (req ,res , next) => {
if (!req.user) {
    throw new apierror(400 , "user login is required !")
}
if(req.user.role !== role) {
    throw new apierror(400 , "access denied u need to have seller role !")
}
})

export { requiredROLE }