import {  Types } from "mongoose"

export type academic_department ={
    name:string,
    academic_faculty: Types.ObjectId
}