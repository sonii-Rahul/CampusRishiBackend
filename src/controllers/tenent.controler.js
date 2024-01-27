import { json } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import {Tenent} from "../models/Tenent.model.js"

import apiResponse from "../utils/apiResponse.js"


const tenentregister = asyncHandler( async  ( req , res ) => {
   //get user details from frontend 
console.log("line10")

   const {

    tenentname,
    Email,
    Description

   } = req.body
   console.log(tenentname);

   console.log(tenentname)

   if([tenentname ,Email,Description].some((field)=> field?.trim()  === "")){

    throw new apiError(400,"all field are required ")

   }


   const existtedtenent=await Tenent.findOne({
    $or:[{Email},{tenentname}]
   })

   if(existtedtenent){
    throw new apiError(409,"user alredy exist")
   }

  const tenent = await Tenent.create({
    tenentname,Email,Description
   })

   console.log(tenentname)

 const createdUser =  await  Tenent.findById(tenent._id)

 if(!createdUser){
    throw new apiError(400,"something went wrong while registring the user ")
 }

 return res.status(201).json(
    new apiResponse(200,createdUser,"Tenent registed successfully ")
 )

} )

export {tenentregister}