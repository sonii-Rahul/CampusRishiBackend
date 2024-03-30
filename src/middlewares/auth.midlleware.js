import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/User.Model.js";
import { apiError } from "../utils/apiError.js";

export const verifyJWT=asyncHandler(async(req,res,next)=>{
  try {
     const token= req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer","")
     if(!token){
      console.log(token)
      throw new apiError("401","unauthorised request")
     }
  
     const decodedtoekn=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     const user = await User.findById(decodedtoekn?._id).select("-password -refreshToken")
     if(!user){
      throw new apiError(401,"invalid accesstoken")
     }
     req.user=user;
     next()
  } catch (error) {
    throw new apiError(401,error?.message||"invalid acccess Token")
    
  }

})

