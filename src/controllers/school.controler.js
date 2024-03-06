import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Tenent } from "../models/Tenent.model.js";
import { registerUser } from "./user.controller.js";
import { User } from "../models/User.Model.js"

const Schoolregister = asyncHandler(async (req, res) => {
  

   const { SchoolfullName, location, username, password,
      role,} = req.body;
      console.log(req.body);

   if (!SchoolfullName || !location ||!username || !password || !role) {
      throw new apiError(400, "All school field are required");
   }
   // const tenent = await Tenent.findOne({ tenentname: tenentname.toLowerCase() });

   // if (!tenent) {
   //    throw new apiError(404, "Tenent not found");
   // }
   // console.log(tenent)
   let fixtenent="5e8503c4cdfe21a6836b936"

   const existedSchool = await School.findOne({
      $and: [{ SchoolfullName }, { location }]
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

      
      SchoolfullName,
      location,
   });

   

   const createdSchool = await School.findById(school._id);
   console.log(createdSchool);

   if (!createdSchool) {
      throw new apiError(400, "Something went wrong while registering the user");
   }

   let fullName=SchoolfullName
   const user = await User.create({
      schoolid:createdSchool.id,
      username,
      fullName,
      password,
      role

   })
   const createdUser = await user.findById(user._id)

   if (!createdUser) {
      throw new apiError(400, "something went wrong while registring the user ")
   }

   return res.status(201).json(
      new apiResponse(200, createdSchool, "School registered successfully")
   );
});

export { Schoolregister };
