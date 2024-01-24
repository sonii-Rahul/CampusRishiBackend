import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
    {

        schoolid: {
            type: Schema.Types.ObjectId,
            ref: "School"
    
    
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
    
    
        },

    },{
        timestamps: true
        
    }
)

export const Teacher = mongoose.model("Teacher",teacherSchema)