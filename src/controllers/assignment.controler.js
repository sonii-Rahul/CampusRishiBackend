import { json } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"

const registerAssignment = asyncHandler( async (req , res)=>{
    
    const { title, Description,deadline,status, studentid,courseid} = req.body;
    
    
    res.status(200).json({

        message: "assignment controler"
       
    })
} )

export { registerAssignment};
