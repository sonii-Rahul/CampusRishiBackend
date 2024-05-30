import mongoose, { Schema } from "mongoose";
const challangeschema = new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,        
        },
 
        challengepayload:{
            type:String,
            required: true,
        },
        passkey:{
            type: Object
        }
    },
    {
        timestamps:true
    }
)



export const Challenge = mongoose.model("Challenge",challangeschema)
