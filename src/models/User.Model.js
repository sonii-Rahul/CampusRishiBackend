import mongoose, { Schema } from "mongoose";

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


export const User = mongoose.model("User", userSchema)