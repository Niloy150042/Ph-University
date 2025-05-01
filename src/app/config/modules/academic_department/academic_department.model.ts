import mongoose, { model, Schema } from "mongoose";
import { Tacademic_department } from "./academic_department.interface";

 const academic_department_model = new Schema<Tacademic_department>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    academic_faculty:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'academicfaculty', // jei name e save ase faculty database e   ,
        required:true
    }
} ,{
    timestamps:true
})

export const department_model = model <Tacademic_department>('academic_department',academic_department_model)