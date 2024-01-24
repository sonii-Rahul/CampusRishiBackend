import mongoose, { Schema }  from "mongoose";

const schoolSchema = new Schema({

    tenentname:{
        type:String,
        required: true,
        unique:true,
        lowecase:true,
        trim: true,
        index:true

    },
    fullName:{
        type:String,
        required:true,
        location:String,
        lowecase:true,
        trim: true,
        index:true

    }

},{
    timestamps:true
})

export const School = mongoose.model("School",schoolSchema)