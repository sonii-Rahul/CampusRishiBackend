import mongoose,{Schema} from "mongoose";

const classCollection = new  Schema({

    courseid:{
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    teacherid:{
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    },
    name:{
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    schedule:{
        type:Date
    }



})

export const ClassCollection = mongoose.model("ClassCollection",classCollection)
