import { model, Schema } from "mongoose";
import { Tacademic_department } from "./academic_department.interface";

 const academic_department_model = new Schema<Tacademic_department>({
    name:{
        Type:String,
        required:true
    },
    academic_faculty:{
        type:Schema.Types.ObjectId,
        ref:'faculty_model' // referencing faculty model 
    }
})

export const department_model =   model <Tacademic_department>('academic_department',academic_department_model)