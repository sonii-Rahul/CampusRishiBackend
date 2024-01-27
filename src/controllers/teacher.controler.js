import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Teacher } from "../models/Teacher.model.js";


const teacherRegister = asyncHandler(async (req, res) => {
   console.log(req.body);

   const { TfullName, fullName, location } = req.body;

   if (!TfullName || !fullName || !location) {
      throw new apiError(400, "All fields are required");
   }

   // Search for a school based on some criteria (e.g., schoolname and location)
   const schoolSearch = await School.findOne({
      $and: [{ fullName }, { location }]
   });

   if (!schoolSearch) {
      throw new apiError(404, "School not found");
   }

   console.log(schoolSearch);

   // Check for an existing teacher based on some criteria (e.g., fullName and schoolname)
   const existingTeacher = await Teacher.findOne({
      $and: [{ TfullName }, { fullName }]
   });

   if (existingTeacher) {
      throw new apiError(409, "Teacher already exists");
   }

   // Create a new teacher based on the provided data
   const newTeacher = await Teacher.create({
      TfullName,
      location
   });

   console.log(fullName);

   if (!newTeacher) {
      throw new apiError(500, "Something went wrong while registering the teacher");
   }

   return res.status(201).json(
      new apiResponse(200, newTeacher, "Teacher registered successfully")
   );
});

export { teacherRegister };
