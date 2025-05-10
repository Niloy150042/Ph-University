import { Types } from "mongoose"

export type Tsemesterregistration={
    academicsemester : Types.ObjectId;
    status :'UPCOMING'|'ONGOGING'|'ENDED',
    startDate :Date,
    endDate:Date,
    mincredit:number,
    maxcredit:number  
}