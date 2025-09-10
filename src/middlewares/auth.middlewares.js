import jwt from "jsonwebtoken"
import { USER } from "../models/user.models.js";
import { apierror } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asynchandler.js";





export const verifyJWT = asyncHandler(async (req , _ , next ) =>  {
    const Token = req.cookies.accesstoken || req.header("Authorization")?.replace("Bearer ", "") 
    if(!Token){
        throw new apierror(400, "unauthorised")
    }

    try {
        const decodedToken = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
        const user = await USER.findById(decodedToken?._id).select("-password -refershtoken")
        
        
        
        if(!user){
            throw new apierror(400,"user is not avialable")
        }

        req.USER = USER

        next()


    } catch (error) {
        throw new apierror(400,"user is out of reach need to do something")
    }





})