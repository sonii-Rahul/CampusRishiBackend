import mongoose, { Schema } from "mongoose";

const courseCollection = new Schema({

    schoolid: {
        type: Schema.Types.ObjectId,
        ref: "School"


    },

    courseName:{
        type: String,
        require: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    Description:{
        type:String,
        require: true,
        unique:true,
        lowecase:true,
        trim: true

    },


},{
    timestamps:true
    
})


export const  CourseCollection = mongoose.model("CourseCollecton",courseCollection)

