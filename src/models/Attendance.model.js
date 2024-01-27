import mongoose,{Schema} from "mongoose";

const attendanceSchema = new Schema({

    studentid:{

        type:Schema.Types.ObjectId,
        ref:"Student"

    },
    classid:{

        type:Schema.Types.ObjectId,
        ref:"ClassCollection"

    },
    date:{
        type:Date,

        required:true,
        default:Date.now


    },
    status:{
        type:Boolean,
        required:true,
        default:false,

    }


},{
    timestamps:true
})


export const Attendance = mongoose.model("Attendance",attendanceSchema)