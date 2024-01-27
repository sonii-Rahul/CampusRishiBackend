import mongoose, { Schema }  from "mongoose";

const schoolSchema = new Schema({

    tenentname:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim: true,
        index:true

    },
    fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim: true,
        index:true

    },locaton:{
        type:String
    }

},{
    timestamps:true
})

export const School = mongoose.model("School",schoolSchema)