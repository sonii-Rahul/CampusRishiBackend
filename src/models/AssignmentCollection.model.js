import mongoose,{Schema} from "mongoose";

const assignmentCollection = new Schema({

    courseid:{
        type: Schema.Types.ObjectId,
        ref: "CourseCollection"
    },

    studentid:{

        type:Schema.Types.ObjectId,
        ref:"Student"

    },
    title:{
        type: String,
        require: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true

    },
    Description:{
        type:String,
        require: true,
        unique:true,
        lowecase:true,
        trim: true

    },
    deadline:{
        type:Date,
        require: true
    },
    status:{
        type:Boolean,
        default:false
    
    }

})

export const AssignmentCollection = mongoose.model("AssignmentCollection",assignmentCollection)