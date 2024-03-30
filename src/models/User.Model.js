import mongoose, { Schema } from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({


    tenentid: {
        type: Schema.Types.ObjectId,
        ref: "Tenent",


    },
    schoolid: {
        type: Schema.Types.ObjectId,
        ref: "School"


    },

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true

    },
    fullName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true

    },
    password: {
        type: String,
        required: [true, "password is requiredd "]

    },

    refreshToken: {

        type: String

    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "teacher", "student"]
    },

    avatar: {

        type: String, //cloudnary url
        


    }


},
    {
        timestamps: true

    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)

}

userSchema.methods.accessTokenGenrate = function(){
    console.log(this.fullName);
   
    
   return  Jwt.sign(
        {
            _id:this._id,
            username:this.username,
            fullName:this.fullName


        },
        
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    

}
userSchema.methods.reFreshTokenGentate = function(){

    return  Jwt.sign(
        {
            _id:this._id,


        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)