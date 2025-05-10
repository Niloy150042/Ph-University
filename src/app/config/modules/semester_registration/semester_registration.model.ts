import { model, Schema } from "mongoose";
import { Tsemesterregistration } from "./semester_registration.interface";

const semesterregistraionschema = new Schema<Tsemesterregistration>({

    academicsemester:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'semester',
    },
    status:{
        type:String,
        enum:['UPCOMING','ONGOING','ENDED'],
        default:'UPCOMING'
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    mincredit:{
        type:Number,
        default:3
    },
    maxcredit:{
        type :Number,
        default:15
    }


},{
    timestamps:true
})

const semesterregistraionmodel = model<Tsemesterregistration>('semesterregistration',semesterregistraionschema)

export default semesterregistraionmodel
