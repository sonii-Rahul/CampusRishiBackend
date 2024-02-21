import { json } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req , res)=>{
    
    const { fullName, locaton, tenentname,} = req.body;
    console.log(fullName);
    
    res.status(200).json({

        message: "campus rishi started"
       
    })
} )

export { registerUser };
