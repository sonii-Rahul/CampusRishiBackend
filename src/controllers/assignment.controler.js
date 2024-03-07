import { json } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js";
import {Student} from "../models/Student.model.js"
import { ClassCollection } from "../models/ClassCollection.model.js";

const registerAssignment = asyncHandler( async (req , res)=>{
    
    const { title, Description,deadline,status, studentid,courseid} = req.body;
    
    if(!title||!Description||!deadline||!studentid||!courseid){
        throw new apiError("400","all fields are require")
    }

    const checkstudent = await Student.findById(studentid)
    if(!checkstudent){
        throw new apiError("400","student not found")

    }
    const checkclass=await ClassCollection.findById(cla)

    
    
    res.status(200).json({

        message: "assignment controler"
       
    })
} )

export { registerAssignment};
