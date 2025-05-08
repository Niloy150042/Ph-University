import { model, Schema } from 'mongoose';
import {
  Tcoursefaculty,
  Tcourses,
  Tprerequisitecourse,
} from './courses.interface';

const prequisitecoursesschema = new Schema<Tprerequisitecourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
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
    default: false,
  },
  preRequisitecourse: [prequisitecoursesschema],
});

const coursefacultyschema = new Schema<Tcoursefaculty>({
  course: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref:'course',
  },
  faculty: [
    {
      type: Schema.Types.ObjectId,
      unique: true,
      ref:'academicfaculty',
    },
  ],
});

export const coursefaculty = model<Tcoursefaculty>(
  'coursefaculty',
  coursefacultyschema,
);

export const course = model<Tcourses>('course', coursemodel);
