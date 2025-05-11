import { Types } from "mongoose"

export type days = 'sat'|'sun'|'mon'|'tue'|'wed'|'thu'|'fri'
export type Tofferedcourse ={
    semesterregistration :Types.ObjectId,
    academicsemester :Types.ObjectId,
    academic_faculty :Types.ObjectId,
    academic_department :Types.ObjectId,
    course:Types.ObjectId,
    maxcapacity :number,
    section :string,
    days : days,
    startTime :string,
    endTime :string
   
}