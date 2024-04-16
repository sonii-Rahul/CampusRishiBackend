
import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { CourseCollection } from "../models/CourseCollection.model.js";

const registerCourse = asyncHandler( async (req , res)=>{
    
   
    
    const { courseName, Description,SchoolfullName} = req.body;

    if (!courseName||!Description||!SchoolfullName){
        throw new apiError(400, "All field are required");


    }

    const existedSchool = await School.findOne({
        $and: [{ SchoolfullName }]
     });
  
     if (!existedSchool) {
        throw new apiError(409, "School not exists");
     }
    
    const existedcourse=await CourseCollection.findOne({
        $and: [{ courseName }]
     });
    if(existedcourse){
        throw new apiError(400, "course alredy exist");
    }

    const createdCourseCollection = await CourseCollection.create({

      
        courseName,
        Description,
        schoolid:existedSchool.id
     });

     if(!createdCourseCollection){
        throw new apiError(400,"error creating course")
     }

     return res.status(201).json(
        new apiResponse(200, createdCourseCollection, "course registered successfully")
     );
} )

const getCoursesBySchool = asyncHandler(async (req, res) => {
   const { SchoolfullName } = req.body;

   if (!SchoolfullName) {
       throw new apiError(400, "SchoolfullName parameter is required");
   }

   const existedSchool = await School.findOne({
      $and: [{ SchoolfullName }]
   });

   if (!existedSchool) {
       throw new apiError(404, "School not found");
   }

   const courses = await CourseCollection.find({ schoolid: existedSchool.id });

   if (!courses || courses.length === 0) {
       throw new apiError(404, "No courses found for the specified school");
   }

   return res.status(200).json(
       new apiResponse(200, courses, "Courses retrieved successfully")
   );
});

export { getCoursesBySchool };

export { registerCourse};
