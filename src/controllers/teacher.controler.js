import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Teacher } from "../models/Teacher.model.js";
import { User } from "../models/User.Model.js"
import mongoose from "mongoose";



const teacherRegister = asyncHandler(async (req, res) => {

   const { TfullName, SchoolfullName, location, username, password,
      role } = req.body;

   if (!TfullName || !SchoolfullName || !location || !username || !password||!role) {
      throw new apiError(400, "All fields are required");
   }

   // Search for a school based on some criteria (e.g., schoolname and location)
   const schoolSearch = await School.findOne({
      $and: [{ SchoolfullName }, { location }]
   });

   if (!schoolSearch) {
      throw new apiError(404, "School not found");
   }

   // Check for an existing teacher based on some criteria (e.g., fullName and schoolname)
   const existingTeacher = await Teacher.findOne({
      $and: [{ TfullName }, { SchoolfullName }]
   });

   if (existingTeacher) {
      throw new apiError(409, "Teacher already exists");
   }

   // Create a new teacher based on the provided data
   const newTeacher = await Teacher.create({
      schoolid: schoolSearch.id,
      TfullName,
      location
   });

   if (!newTeacher) {
      throw new apiError(500, "Something went wrong while registering the teacher");
   }
   const existedusername = await User.findOne({
      $or: [ { username }]
   })
   if (existedusername) {
      throw new apiError(409, "username already exists");
   }
   let fullName=TfullName

   const user = await User.create({
      schoolid:schoolSearch.id,
      username,
      fullName,
      password,
      role

   })
   const createdUser = await User.findById(user._id)

   if (!createdUser) {
      throw new apiError(400, "something went wrong while registring the user ")
   }



   return res.status(201).json(
      new apiResponse(200, newTeacher, "Teacher registered successfully")
   );
});


const fetchTeachersBySchoolId = asyncHandler(async (req, res) => {
   const { schoolId } = req.body;
    // Assuming schoolId is provided as a parameter
    console.log("error is here");
    console.log(req.body);

   // Check if the schoolId is provided
   if (!schoolId) {
      throw new apiError(400, "School ID is required");
   } 

   // Fetch teachers by school ID
   const teachers = await Teacher.find({ schoolid: schoolId });

   // Check if any teachers are found
   if (teachers.length === 0) {
      console.log("No teachers found");
      return res.status(404).json(
         new apiResponse(404, null, "No teachers found")
      );
   }

   // Teachers found
   return res.status(200).json(
      new apiResponse(200, teachers, "Teachers fetched successfully")
   );
});




export { fetchTeachersBySchoolId };

export { teacherRegister };
