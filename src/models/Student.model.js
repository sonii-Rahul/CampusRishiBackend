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

export const Student = mongoose.model("Student",studentSchema)