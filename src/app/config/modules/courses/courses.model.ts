import { model, Schema } from 'mongoose';
import { Tcourses, Tprerequisitecourse } from './courses.interface';

const prequisitecoursesschema = new Schema<Tprerequisitecourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref:'course'
  },
  isdeleted: {
    type: Boolean,
    default: false,
  },
});
const coursemodel = new Schema<Tcourses>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  isdeleted: {
    type: Boolean,
    default:false
  },
  preRequisitecourse: [prequisitecoursesschema],
  
});
export const course = model<Tcourses>('course', coursemodel);
