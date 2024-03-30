import mongoose,{Schema} from "mongoose";

const studentSchema = new Schema({

    schoolid: {
        type: Schema.Types.ObjectId,
        ref: "School"


    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"


    },
    courseid:{
        type: Schema.Types.ObjectId,
        ref: "ClassCollection"
    }

})

studentSchema.methods.getUserDetails = async function () {
    try {
        // Populate the 'user' field to fetch associated user details
        await this.populate('user').execPopulate();
        // Access user details from the populated 'user' field
        return this.user;
    } catch (error) {
        throw new Error("Error fetching user details:", error);
    }
};

export const Student = mongoose.model("Student",studentSchema)