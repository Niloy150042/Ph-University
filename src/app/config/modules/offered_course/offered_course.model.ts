import { model, Schema } from 'mongoose';
import { Tofferedcourse } from './offered_course.interface';

const days = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

const offeredcourseschema = new Schema<Tofferedcourse>({
  semesterregistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'semesterregistration',
  },
  academicsemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'semester',
  },
  academic_faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academicfaculty',
  },
  academic_department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academic_department',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'course',
  },
  
  maxcapacity: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    enum: days,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    requierd: true,
  },
});

export const offerecoursemodel = model<Tofferedcourse>(
  'offeredcoures',
  offeredcourseschema,
);
