import { model, Schema } from 'mongoose';
import { Tacademic_faculty } from './academic_faculty.interface';

const academic_faculty_schema = new Schema<Tacademic_faculty>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
} ,{
    timestamps:true
});
export const faculty_model = model<Tacademic_faculty>('academicfaculty',academic_faculty_schema)