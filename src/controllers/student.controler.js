import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { School } from "../models/Schools.model.js";
import apiResponse from "../utils/apiResponse.js";
import { Tenent } from "../models/Tenent.model.js";
import { registerUser } from "./user.controller.js";
import { User } from "../models/User.Model.js"

const Schoolregister = asyncHandler(async (req, res) => {

    console.log(req.body)
    const { TfullName, SchoolfullName, location, username, password,
        role } = req.body;


});

export {StudentRegister}