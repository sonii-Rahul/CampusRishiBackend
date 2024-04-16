import { json } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js";
import { User } from "../models/User.Model.js";
import apiResponse from "../utils/apiResponse.js";

const genrateAccessAndRefreshTokens=async(userId)=>{
    try {
       const user= await User.findById(userId)
       if(!user){
        throw new apiError(400,"usernot getting in genrate section ")
       }
      
       const accesstoken= user.accessTokenGenrate()
       const refreshtoken=user.reFreshTokenGentate()
      
       user.refreshtoken=refreshtoken
       await user.save({validateBeforesave:false})
       return{accesstoken,refreshtoken}
        
    } catch (error) {
        throw new apiError("500",error,"something went wrong while genrateing refresh and access Token")
        
    }
}

const loginUser = asyncHandler( async (req , res)=>{
    
    const { username,password,} = req.body;
    if(!username||!password){
        throw new apiError("400","all user fields are required")
    }
    const checkuser= await User.findOne({username})
    if(!checkuser){
        throw new apiError("401","usernot found")
    }
    const ispasswordvalid=await checkuser.isPasswordCorrect(password)
    if(!ispasswordvalid){
        throw new apiError("401","password incoorect")
    }
   const{accesstoken,refreshtoken}=await genrateAccessAndRefreshTokens(checkuser._id)
   const loggedinuser=await User.findById(checkuser._id).select("-password -refreshToken")
   const options={
    path: '/'
   }
   return res.status(200)
   .cookie("accessToken",accesstoken,options)
   .cookie("refreshToken",refreshtoken,options)
   .json(
    new apiResponse(200,{
        user:loggedinuser,accesstoken,refreshtoken
    },
    "User Logged in successfully"
    )
   )
    
    
} )

const logOutUser=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const updated = await User.findByIdAndUpdate(userId,
        {
            $set:{refreshToken:undefined}
        },
        {
            new:true
        })

        const options={
            httpOnly:true,
            secure:true
           }

           return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new apiResponse(200,"user log ot successfully"))



})

const verifyLogin = async (req, res) => {
    try {
        const userId = req.user._id;       
        const verifiedUser = await User.findById(userId);

        if (verifiedUser) {
            const response = new apiResponse(200, { user: verifiedUser }, "userverified");
            return res.status(response.statuscode).json(response);
        } else {
            const response = new apiResponse(404, null, "User not found");
            return res.status(response.statuscode).json(response);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        const response = new apiResponse(500, null, "Internal Server Error");
        return res.status(response.statuscode).json(response);
    }
};



export { loginUser ,logOutUser,verifyLogin };
