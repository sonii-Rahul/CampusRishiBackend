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
        require: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true

    },
    fullName: {
        type: String,
        require: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true

    },
    password: {
        type: String,
        require: [true, "password is required "]

    },

    refreshToken: {

        type: string

    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "teacher", "student"]
    },

    avatar: {

        type: string, //cloudnary url
        require: true


    }


},
    {
        timestamps: true

    }
)


export const User = mongoose.model("User", userSchema)