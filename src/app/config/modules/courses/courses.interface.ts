import { Types } from "mongoose"

export type Tprerequisitecourse ={
    course : Types.ObjectId
    isdeleted:boolean
}
export type Tcourses={
    create: any
    title:string,
    prefix:string,
    code:number,
    credits:number,
    isdeleted:boolean,
    preRequisitecourse: [Tprerequisitecourse]
}
export type Tcoursefaculty ={ 
    course :Types.ObjectId
    faculty:[Types.ObjectId]
}