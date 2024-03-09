import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { ClassCollection} from "../models/ClassCollection.model.js";
import { CourseCollection } from "../models/CourseCollection.model.js";


const registerClass = asyncHandler( async (req , res)=>{
    
    const { name, schedule,courseName,teacherid,} = req.body;

    if (!name||!schedule||!courseName||!teacherid){
        throw new apiError("400","all class fields are required ")
    }
    console.log(req.body)
    const existedclass=await ClassCollection.findOne({
        $and: [{ name },{schedule},{teacherid}]
     })
     if(existedclass){
        throw new apiError("400","class alredy exist")
     }
     const existedcourse=await CourseCollection.findOne({
        $and: [{courseName}]
     })

     if(!existedcourse){
        throw new apiError ("400","no course found")

     }

     const creatednewclass= await ClassCollection.create({
        courseid:existedcourse.id,
        teacherid,
        name,
        schedule,

     })
     return res.status(201).json(
        new apiResponse(200, creatednewclass, "class registered successfully")
     );
} )

export { registerClass };
