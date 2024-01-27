import { json } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"

const tenentregister = asyncHandler( async(req,res)=>{
    res.status(200).json({
        message: "tenent register"
    })
} )

export {tenentregister}