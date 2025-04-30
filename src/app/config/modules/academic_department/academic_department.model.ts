import { model, Schema } from "mongoose";
import { Tacademic_department } from "./academic_department.interface";

 const academic_department_model = new Schema<Tacademic_department>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    academic_faculty:{
        type:Schema.Types.ObjectId,
        ref:'faculty_model' // referencing faculty model 
    }
} ,{
    timestamps:true
})

export const department_model =   model <Tacademic_department>('academic_department',academic_department_model)