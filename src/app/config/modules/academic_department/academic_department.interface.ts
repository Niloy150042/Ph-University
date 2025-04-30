import {  Types } from "mongoose"

export type Tacademic_department ={
    name:string,
    academic_faculty: Types.ObjectId
}