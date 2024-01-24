import mongoose,{Schema} from "mongoose";

const blogSchema = new Schema({

    schoolid: {
        type: Schema.Types.ObjectId,
        ref: "School"


    },

    userid:{
        type: Schema.Types.ObjectId,
        ref: "User"
        
    },
    courseid:{
        type: Schema.Types.ObjectId,
        ref: "CourseCollection"
    },

    title:{
        type: String,
        require: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    content:{
        type: String,

    },
    date:{
        type:Date,
        default:Date.now

    },
    image:{
        type:string,
        
    }




},{
    timestamps:true
})


export const Blog = mongoose.model("Blog",blogSchema)