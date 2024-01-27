import mongoose, { Schema } from "mongoose";

const schoolSchema = new Schema({
    tenentname: {
        type: Schema.Types.ObjectId,
        ref: "Tenent",
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    location: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});

export const School = mongoose.model("School", schoolSchema);
