import { application, json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Tenent } from "../models/Tenent.model.js";
import { User } from "../models/User.Model.js"
import { ClassCollection } from "../models/ClassCollection.model.js";
import { Student } from "../models/Student.model.js";
import { CourseCollection } from "../models/CourseCollection.model.js";

const StudentRegister = asyncHandler(async (req, res) => {

    const {  fullName, SchoolfullName, location, username, password,courseName,
        role } = req.body;
    

        if(!fullName||!SchoolfullName||!location||!username||!password||!courseName||!role){
            throw new apiError("400","all fields are required  in student")

        }
        const existinguser=await User.findOne({
            $and: [{ username }]
        })
        if(existinguser){
            throw new apiError("400","user alredy exist")
        }
        const checkschool=await School.findOne({
            $and:[{SchoolfullName},{location}]
        })
        if(!checkschool){
            throw new apiError("400","school not exist")
        }
        const checkCourse=await CourseCollection.findOne({
            $and:[{courseName}]

        })
        if(!checkCourse){
            throw new apiError("400","course not found")
        }
        const user=await User.create({
            fullName,
            schoolid:checkschool.id,
            username,
            password,
            role
        })
        const createduser=await User.findById(user.id)
       
        if(!createduser){
            throw new apiError("401","something went wrong")
        }
        const student=await Student.create({
            schoolid:createduser.schoolid,
            user:createduser.id,
            courseid:checkCourse.id

        })
        const createdstudent=await Student.findById(student.id)
        if(!createdstudent){
            throw new apiError("400","something went wrong at student ")
        }
        return res.status(201).json(
            new apiResponse(200, createduser, "School registered successfully")
         );




});

export {StudentRegister}