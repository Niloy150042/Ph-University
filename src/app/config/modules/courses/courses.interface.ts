import { Types } from "mongoose"

export type Tprerequisitecourse ={
    course : Types.ObjectId
    isdeleted:boolean
}
export type Tcourses={
    title:string,
    prefix:string,
    code:number,
    credits:number,
    isdeleted:boolean,
    preRequisitecourse: [],
}