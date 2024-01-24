
//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from './db/index.js'


dotenv.config({
    path: './.env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(` server is running on the port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongo db connecttion failed ",err)
})

app.listen(process.env.PORT,()=>{
    console.log(`app is Listining to the por number ${process.env.PORT}`)
})

























/*

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"


import express from "express"
import { error } from "console";

const app = express()





;(  async ( )=>{

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("ERROR",error)
            throw error

        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is Listining to the por number ${process.env.PORT}`)
        })
        
    } catch (error) {
        console.error("ERROR",error)
        throw error

    }
}  )()

*/