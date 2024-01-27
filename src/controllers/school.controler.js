import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Tenent } from "../models/Tenent.model.js";

const Schoolregister = asyncHandler(async (req, res) => {
   console.log(req.body);

   const { fullName, locaton, tenentname } = req.body;

   if (!fullName || !locaton || !tenentname) {
      throw new apiError(400, "field are required");
   }
   const tenent = await Tenent.findOne({ tenentname: tenentname.toLowerCase() });

   if (!tenent) {
      throw new apiError(404, "Tenent not found");
   }
   console.log(tenent)

   const existedSchool = await School.findOne({
      $and: [{ fullName }, { locaton }]
   });

   if (existedSchool) {
      throw new apiError(409, "School already exists");
   }

   const school = await School.create({
      fullName,
      locaton,
      tenentname: tenent._id
   });

   console.log(fullName);

   const createdSchool = await School.findById(school._id);
   console.log(createdSchool);

   if (!createdSchool) {
      throw new apiError(400, "Something went wrong while registering the user");
   }

   return res.status(201).json(
      new apiResponse(200, createdSchool, "School registered successfully")
   );
});

export { Schoolregister };
