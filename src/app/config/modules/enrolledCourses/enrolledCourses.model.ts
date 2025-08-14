import mongoose, { Schema } from 'mongoose';
import { TCourseMarks, TenrolledCourses } from './enrolledCourses.interface';
const courseMarksSchema = new Schema<TCourseMarks>({
  classTest1: {
    type: Number,
    default: 0,
  },
  midTerm: {
    type: Number,
    default: 0,
  },
  classTest2: {
    type: Number,
    default: 0,
  },
  finalTerm: {
    type: Number,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema<TenrolledCourses>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'semesterregistration',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'semester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicfaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academic_department',
    required: true,
  },
  offeredcourse: {
    type: Schema.Types.ObjectId,
    ref: 'offeredcoures',
    required: true,
  },
  course: { type: Schema.Types.ObjectId, ref: 'course', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'student', required: true },
  faculty: { type: Schema.Types.ObjectId, ref: 'academicfaculty', required: true },

  isEnrolled: { type: Boolean, default: false },
  courseMarks: { type: courseMarksSchema },
  grade: { type: String, enum: ['A','B','C','D','E','F','N/A'], default: null },
  gradePoint: { type: Number, min:0,max:4, default: 0 },
  iscompleted: { type: Boolean, default: false },
});
const EnrolledCourse = mongoose.model<TenrolledCourses>('EnrolledCourse',enrolledCourseSchema)
export default EnrolledCourse
