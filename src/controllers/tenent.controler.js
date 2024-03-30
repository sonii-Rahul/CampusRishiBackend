import { json } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { Tenent } from "../models/Tenent.model.js"
import { User } from "../models/User.Model.js"


import apiResponse from "../utils/apiResponse.js"


const tenentregister = asyncHandler(async (req, res) => {

   console.log(req.body);

   const {

      tenentname,
      Email,
      Description,
      username,
      fullName,
      password,
      role,


   } = req.body
   console.log(Email);

   console.log(tenentname)



   if ([tenentname, Email, Description,username,fullName,password,role].some((field) => field?.trim() === "")) {

      throw new apiError(400, "all field are required ")

   }


   const existtedtenent = await Tenent.findOne({
      $or: [{ Email }, { tenentname }]
   })
   const existedusername = await User.findOne({
      $or: [ { username }]
   })

   if (existtedtenent) {
      throw new apiError(409, "tenet alredy exist")
   }
   if (existedusername) {
      throw new apiError(408, "user alredy exist")
   }
   console.log(tenentname)

   const tenent = await Tenent.create({
      tenentname, Email, Description
   })

   const user = await User.create({
      
      tenentid:tenent._id,
      username,
      fullName,
      password,
      role

   })

   

   console.log(tenentname)

   const createdUser = await Tenent.findById(tenent._id)

   if (!createdUser) {
      throw new apiError(400, "something went wrong while registring the user ")
   }
   if (!user) {
      throw new apiError(400, "something went wrong while registring the user ")
   }

   

   return res.status(200).json(
      new apiResponse(200, createdUser, "Tenent registed successfully ")
   )

})

export { tenentregister }