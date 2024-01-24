import mongoose,{Schema} from "mongoose";

const tenentSchema = new Schema(
    {
        tenentname:{
            type:String,
            require: true,
            unique:true,
            lowecase:true,
            trim: true,
            index:true

        },
        Email:{
            type: String,
            require: true,
            unique:true,
            lowecase:true,
            trim: true

        },
        Description:{
            type:String,
            require: true,
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
