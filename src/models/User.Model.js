import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({


    tenentid: {
        type: Schema.Types.ObjectId,
        ref: "Tenent"

    },
    schoolid: {
        type: Schema.Types.ObjectId,
        ref: "School"


    },

    username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true

    },
    fullName: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true

    },
    password: {
        type: String,
        required: [true, "password is requiredd "]

    },

    refreshToken: {

        type: string

    },
    role: {
        type: String,
        requiredd: true,
        enum: ["admin", "teacher", "student"]
    },

    avatar: {

        type: string, //cloudnary url
        required: true


    }


},
    {
        timestamps: true

    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)

}

userSchema.methods.accessTokenGentate = function(){
    
   return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName


        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresin: process.env.ACCESS_TOKEN_EXPIR
        }
    )

}
userSchema.methods.reFreshTokenGentate = function(){

    return  jwt.sign(
        {
            _id:this._id,


        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresin: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)