import mongoose,{Schema} from "mongoose";

const tenentSchema = new Schema(
    {
        tenentname:{
            type:String,
            required: true,
            unique:true,
            lowecase:true,
            trim: true,
            index:true

        },
        Email:{
            type: String,
            required: true,
            unique:true,
            lowecase:true,
            trim: true

        },
        Description:{
            type:String,
            required: true,
            unique:true,
            lowecase:true,
            trim: true

        },
        

    
    },
    {
        timestamps:true
    }
)



export const Tenent = mongoose.model("Tenent",tenentSchema)
