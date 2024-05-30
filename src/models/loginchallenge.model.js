import mongoose, { Schema } from "mongoose";
const loginchallangeschema = new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,        
        },
 
        challengepayload:{
            type:String,
            required: true,
        },
    },
    {
        timestamps:true
    }
)



export const Loginchallenge = mongoose.model("Loginchallenge",loginchallangeschema)
