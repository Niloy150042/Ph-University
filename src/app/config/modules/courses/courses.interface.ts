import { Types } from "mongoose"

export type Tprerequisitecourse ={
    course : Types.ObjectId
    isdeleted:boolean
}

export type Tfaculties ={
    faculty :Types.ObjectId
    isdeleted:boolean
}

export type Tcourses={
    create: any
    title:string,
    prefix:string,
    code:number,
    credits:number,
    isdeleted:boolean,
    preRequisitecourse: [Tprerequisitecourse],
    faculty :[Tfaculties]
}