import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Teacher } from "../models/Teacher.model.js";
import { User } from "../models/User.Model.js"



const teacherRegister = asyncHandler(async (req, res) => {
   console.log(req.body);

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

   console.log(schoolSearch);

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

   console.log(SchoolfullName);

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

export { teacherRegister };
