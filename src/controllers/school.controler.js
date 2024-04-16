import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Tenent } from "../models/Tenent.model.js";

import { User } from "../models/User.Model.js"

const Schoolregister = asyncHandler(async (req, res) => {
  

   const { SchoolfullName, location, username, password,
      role,tenentname} = req.body;
   if (!SchoolfullName || !location ||!username || !password || !role ||!tenentname) {
      throw new apiError(400, "All school field are required");
   }
   const tenent = await Tenent.findOne({ _id:tenentname });

   if (!tenent) {
       throw new apiError(404, "Tenent not found");
    }

   const existedSchool = await School.findOne({
      $and: [{ SchoolfullName }, { location },{tenentname}]
   });

   if (existedSchool) {
      throw new apiError(409, "School already exists");
   }
   const existedusername = await User.findOne({
      $or: [ { username }]
   })
   if (existedusername) {
      throw new apiError(409, "username already exists");
   }

   const school = await School.create({

      tenentid:tenent._id,
      SchoolfullName,
      location,
   });   

   const createdSchool = await School.findById(school._id);
   if (!createdSchool) {
      throw new apiError(400, "Something went wrong while registering the user");
   }

   let fullName=SchoolfullName
   const user = await User.create({
      tenentid:tenent._id,
      schoolid:createdSchool.id,
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
      new apiResponse(200, createdSchool, "School registered successfully")
   );
});

export { Schoolregister };
