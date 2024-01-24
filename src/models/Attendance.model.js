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

        require:true,
        default:date.now


    },
    status:{
        type:Boolean,
        require:true,
        default:false,

    }


},{
    timestamps:true
})


export const Attendance = mongoose.model("Attendance",attendanceSchema)