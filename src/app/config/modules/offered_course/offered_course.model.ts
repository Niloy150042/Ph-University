import { model, Schema } from "mongoose";
import { Tofferedcourse } from "./offered_course.interface";

const  days = ['sat','sun','mon','tue','wed','thu','fri']

const offeredcourseschema = new Schema<Tofferedcourse>({
    semesterregistration:{
        type:Schema.Types.ObjectId,
        required:true
    },
    academicsemester:{
         type :Schema.Types.ObjectId,
         required:true
    },
    academic_faculty:{
        type:Schema.Types.ObjectId,
        required:true
    },
    academic_department:{
        type:Schema.Types.ObjectId,
        required:true
    },
    course :{
        type:Schema.Types.ObjectId,
        required:true
    },
    faculty:{
        type :Schema.Types.ObjectId,
        required:true
    },
    maxcapacity:{
        type:Number,
        required :true
    },
    section:{
        type:String,
        required :true
    },
    days:{
        type :String,
        enum : days
    },
    startTime:{
        type :String,
        required:true
    },
    endTime :{
        type :String,
        requierd:true
    }
})

export  const offerecoursemodel = model<Tofferedcourse>('offeredcoures',offeredcourseschema) 