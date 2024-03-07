import { json } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js";
import { User } from "../models/User.Model.js";

const loginUser = asyncHandler( async (req , res)=>{
    
    const { username,password,} = req.body;
    console.log(req.body)
    if(!username||!password){
        throw new apiError("400","all user fields are required")
    }
    const checkuser= await User.findOne({username})
    if(!checkuser){
        throw new apiError("401","usernot found")
    }
    if(password!=checkuser.password){
        throw new apiError("401","wrong password")
    }
   
    
    res.status(200).json({

        message: "campus rishi started"
       
    })
} )


export { loginUser };
